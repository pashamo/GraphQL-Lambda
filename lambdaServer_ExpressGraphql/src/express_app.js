const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({typeDefs,resolvers});
const port = 4000;

const init = () => {
  const app = express();

  app.get('/', (request, reply)  => {
    reply.send(`Welcome to the Express GraphQL Server wrapped in Express\nplease go to /dev/graphql to play around with the API`);
  });

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  return app;
};


if (require.main === module) {
  init().listen(port, () => {
    console.log(`express-graphql Listening on http://localhost:${port}`);
  });
} else {
  module.exports = init;
}

