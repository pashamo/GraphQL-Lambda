const { ApolloServer , gql } = require('apollo-server-lambda');
const { buildFederatedSchema } = require('@apollo/federation');
const AWS = require('aws-sdk');
const configDDB = require('./config');

configDDB();

const docClient = new AWS.DynamoDB.DocumentClient();
const port = 4001;

const typeDefs = gql`
  type Driver {
    driver: String!
    f1constructor: String!
    pointsCumulative: [Int!]
    totalPoints: Int
  }

  extend type Query {
    f1drivers: [Driver!]
    f1driverfilter(f1constructor: [String!]): [Driver!]
    f1driver(driver: String!): Driver!
  }
`;

const resolvers = {
  Query: {
    //retreive all drivers
    f1drivers: async () => {
      let driversData = new Promise(async (resolve, reject) =>  {
        let params = {
          TableName: "DEMO_F1DriversStandings",
        };
        await docClient.scan(params, (err, data) => {
          if (err) {
            console.error("Unable to retreive Drivers:", JSON.stringify(data,null,2));
          } else {
            //console.log("Scan Succeeded:", JSON.stringify(data.Items,null,2));
            resolve(data.Items);
          }
        });
      })

      return await driversData;
    },


    f1driverfilter: async (parent,args) => {
      let filterexpression = "";
      let exprattvals = {};

      args.f1constructor.map(team => {
        let tempKey = ":"+team.replace(/\s/g, ''); 
        console.log(tempKey);
        exprattvals = {
          ...exprattvals, 
          [tempKey]: team
        };
        if (filterexpression == "") {
          filterexpression += "f1constructor = "+tempKey;
        } else {
          filterexpression += " OR f1constructor = "+tempKey;
        }
      });

      let driverData = new Promise(async (resolve,reject) => {      
        let params = {
          TableName: "DEMO_F1DriversStandings",
          FilterExpression: filterexpression,
          ExpressionAttributeValues: exprattvals
        };

        await docClient.scan(params, (err, data) => {
          if (err) {
            console.error("Unable to retreive Driver:", JSON.stringify(err,null,2));
          } else {
            //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
            resolve(data.Items);
          }
        })
      })
 
      return driverData;
    },

    //retreive a single driver given driver name
    f1driver: async (parent, args) => {
      let driverData = new Promise(async (resolve,reject) => {
        let params = {
          TableName: "DEMO_F1DriversStandings",
          Key: {
            "driver": args.driver
          }
        };
        await docClient.get(params, (err, data) => {
          if (err) {
            console.error("Unable to retreive Driver:", JSON.stringify(err,null,2));
          } else {
            //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
            resolve(data.Item);
          }
        })
      })
 
      return driverData;
    },
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{typeDefs,resolvers}])
});

module.exports.driversHandler = server.createHandler();