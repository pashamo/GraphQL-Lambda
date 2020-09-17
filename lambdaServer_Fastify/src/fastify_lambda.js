const awsLambdaFastify = require('aws-lambda-fastify');
const init = require('./fastify_app');

const proxy = awsLambdaFastify(init());

exports.handler = proxy;