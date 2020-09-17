const fastify = require('fastify');
const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs , resolvers } = require('./graphql');

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

const init = () => {
  const app = fastify();

  app.register(server.createHandler());

  app.get('/', (request, reply) => 
    reply.send({hello: 'world'})
  );
  return app;
};

if (require.main === module) {
  init().listen(4000, (err) => {
    if (err) {
      console.error(err);
    } 
    console.log("server listening on port 4000");
  });
} else {
  module.exports = init;
}