const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: {
    endpoint: "/dev/graphql"
  }
});

exports.graphqlHandler = server.createHandler();
