const AWS = require('aws-sdk');
const configDDB = require('./config');

configDDB();

const docClient = new AWS.DynamoDB.DocumentClient();
const NEW_COMMENT = "NEW_COMMENT";

module.exports = {
  Subscription: {
    newComment: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(NEW_COMMENT)
    }
  },

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

          pubsub.publish(NEW_COMMENT, {
            newComment: {
              comment: params.Item.comment,
              id: params.Item.id
            }
          })

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

