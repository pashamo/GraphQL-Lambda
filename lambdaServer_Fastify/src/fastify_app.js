const fastify = require('fastify');

const { ApolloServer } = require('apollo-server-fastify');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/dev/graphql"
  }
});

const init = () => {
  const app = fastify();
  app.register(server.createHandler());
  app.register(require('fastify-cors'));
  app.get('/', (request, reply)  => {
    reply.send(`Welcome to the Apollo GraphQL Server wrapped in Fastify\nplease go to /dev/graphql to play around with the API`);
  });
  return app;
}

if (require.main === module) {
  //This condition allows to run server locally 
  //eg. node src/fastify_app
  init().listen(4000, err => {
    if (err) {
      console.error(err);
    }
    console.log('Listening on port 4000');
  })
} else {
  //This condition exports the fastify app for lambda purpose
  module.exports = init;
}