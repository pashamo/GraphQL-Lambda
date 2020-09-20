const { ApolloServer , gql } = require('apollo-server-lambda');
const { buildFederatedSchema } = require('@apollo/federation');
const AWS = require('aws-sdk');
const configDDB = require('./config');

configDDB();

const docClient = new AWS.DynamoDB.DocumentClient();
const port = 4002;

const typeDefs = gql`
  type Comment {
    comment: String!
    id: String!
  }

  extend type Query {
    f1comments: [Comment!]
  }

  extend type Mutation {
    addf1comment(comment: String!): Comment
    deletef1comment(id:String!): Comment
  }
`;

const resolvers = {
  Query: {
    f1comments: async () => {
      let commentsData = new Promise(async (resolve,reject) => {
        let params = {
          TableName: "DEMO_F1Comments"
        };
        await docClient.scan(params, (err, data) => {
          if (err) {
            console.error("Unable to retreive Comments:", JSON.stringify(err,null,2));
          } else {
            //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
            resolve(data.Items);
          }
        })
      })
 
      return commentsData;
    }
  },

  
  Mutation: {
    addf1comment: async (parent, args, {pubsub}) => {
      let newDate = new Date();
      console.log(newDate)
      let params = {
        TableName: "DEMO_F1Comments",
        Item: {
          "comment": args.comment,
          "id": newDate.toString()
        }
      };
      docClient.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add item", JSON.stringify(err,null,2));
        } else {
          console.log("PutItem succeeded:", JSON.stringify(data,null,2));
        }
      });
    },


    deletef1comment: async (parent, args) => {
      let updateParams = {
        TableName: "DEMO_F1Comments",
        Key: {
          "id": args.id
        }
      };
      docClient.delete(updateParams, (err, data) => {
        if (err) {
          console.error("Unable to delete item", JSON.stringify(err,null,2));
        } else {
          console.log("DeleteItem succeeded:", JSON.stringify(data,null,2));
        }
      });
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{typeDefs,resolvers}])
});

module.exports.commentsHandler = server.createHandler();



