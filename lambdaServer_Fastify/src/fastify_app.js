const fastify = require('fastify');

const init = () => {
  const app = fastify();
  app.get('/', (request, reply)  => {
    reply.send("Hello Mohammed!")
  });
  return app;
}

if (require.main === module) {
  init().listen(4000, err => {
    if (err) {
      console.error(err);
    }
    console.log('Listening on port 4000');
  })
} else {
  module.exports = init;
}