const { gql } = require('apollo-server-lambda');


// const AWS = require('aws-sdk');
// const configDDB = require('./config');

// AWS.config.update({
//   accessKeyId: configDDB.accessKeyId,
//   secretAccessKey: configDDB.secretAccessKey,
//   region: configDDB.region,
//   endpoint: configDDB.endpoint_prod
// });

// const docClient = new AWS.DynamoDB.DocumentClient();

// const typeDefs = gql`
//   type Driver {
//     driver: String
//     f1constructor: String
//     pointsCumulative: [Int]
//   }

//   type Comment {
//     comment: String
//     id: String
//   }

//   type Query {
//     f1drivers: [Driver]
//     f1driver(driver: String!): Driver
//     f1comments: [Comment]
//   }

//   type Mutation {
//     addf1comment(comment: String!): Comment
//     deletef1comment(id: String!): Comment
//   }
// `;


// const resolvers = {
//   Query: {
//     //retreive all drivers
//     f1drivers: async () => {
//       let driversData = new Promise(async (resolve, reject) =>  {
//         let params = {
//           TableName: "DEMO_F1DriversStandings",
//         };
//         await docClient.scan(params, (err, data) => {
//           if (err) {
//             console.error("Unable to retreive Drivers:", JSON.stringify(data,null,2));
//           } else {
//             //console.log("Scan Succeeded:", JSON.stringify(data.Items,null,2));
//             resolve(data.Items);
//           }
//         });
//       });

//       return await driversData;
//     },

//     //retreive a single driver given driver name
//     f1driver: async (parent, args) => {
//       let driverData = new Promise(async (resolve,reject) => {
//         let params = {
//           TableName: "DEMO_F1DriversStandings",
//           Key: {
//             "driver": args.driver
//           }
//         };
//         await docClient.get(params, (err, data) => {
//           if (err) {
//             console.error("Unable to retreive Driver:", JSON.stringify(err,null,2));
//           } else {
//             //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
//             resolve(data.Item);
//           }
//         })
//       })
 
//       return driverData;
//     },


//     f1comments: async () => {
//       let commentsData = new Promise(async (resolve,reject) => {
//         let params = {
//           TableName: "DEMO_F1Comments"
//         };
//         await docClient.scan(params, (err, data) => {
//           if (err) {
//             console.error("Unable to retreive Comments:", JSON.stringify(err,null,2));
//           } else {
//             //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
//             resolve(data.Items);
//           }
//         })
//       })
 
//       return commentsData;
//     }
//   },
//   Mutation: {
//     addf1comment: async (parent,args) => {
//       let newDate = new Date();
//       console.log(newDate)
//       let params = {
//         TableName: "DEMO_F1Comments",
//         Item: {
//           "comment": args.comment,
//           "id": newDate.toString()
//         }
//       };
//       docClient.put(params, (err, data) => {
//         if (err) {
//           console.error("Unable to add item", JSON.stringify(err,null,2));
//         } else {
//           console.log("PutItem succeeded:", JSON.stringify(data,null,2));
//         }
//       });
//     },


//     deletef1comment: async (parent, args) => {
//       let updateParams = {
//         TableName: "DEMO_F1Comments",
//         Key: {
//           "id": args.id
//         }
//       };
//       docClient.delete(updateParams, (err, data) => {
//         if (err) {
//           console.error("Unable to delete item", JSON.stringify(err,null,2));
//         } else {
//           console.log("DeleteItem succeeded:", JSON.stringify(data,null,2));
//         }
//       });
//     }
//   }
// };


// module.exports = {
//   typeDefs: typeDefs,
//   resolvers: resolvers
// };


// const { gql } = require('apollo-server-lambda');

// const books = [
//   {id: 1, title: "Global Shift", author: "Peter Dicken"},
//   {id: 2, title: "Miracles of the Qur'an", author: "Harun Yahya"},
//   {id: 3, title: "The Beginning of Guidance", author: "Abu Hamid Al-Ghazali"},
//   {id: 4, title: "Hunt for Red October", author: "Tom Clancy"},
//   {id: 5, title: "Sum of All Fears", author: "Tom Clancy"},
  
// ];

// // Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Book {
//     id: Int
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }

//   type Mutation {
//     addBook(id: Int!, title: String!, author: String!): Book!
//   }
// `;

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     books: () => books
//   },
//   Mutation: {
//     addBook: (parent, args) => {
//       const newBook = {
//         id: args.id,
//         title: args.title,
//         author: args.author
//       };

//       let existflag = false;

//       books.map(book => {
//         if(book.id === newBook.id && book.title === newBook.title && book.author === newBook.author) {
//           existflag = true;
//           return;
//         } else {
//           return;
//         }
//       });
      
//       if (existflag) {
//         throw new Error("Book Already in List.");
//       } else {
//         books.push(newBook);
//         return newBook;
//       }
      
//     }
//   }
// };

// module.exports = {
//   typeDefs: typeDefs,
//   resolvers: resolvers
// }