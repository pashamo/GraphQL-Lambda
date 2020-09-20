'use strict'

const { ApolloServer } = require('apollo-server-lambda');
const { ApolloGateway } = require('@apollo/gateway');

const port = 4000;

const gateway = new ApolloGateway({
  serviceList: [
    { 
      name: "drivers",
      url: "https://v7l7pq9ic7.execute-api.us-east-2.amazonaws.com/dev/graphql"
    },
    {
      name: "comments",
      url: "https://ng8n5feqqh.execute-api.us-east-2.amazonaws.com/dev/graphql"
    }
  ]
})

const server = new ApolloServer({ 
  gateway,
  subscriptions: false
});

module.exports.graphqlHandler = server.createHandler();
