const awsServerlessExpress = require('aws-serverless-express');
const init = require('./express_app');
const server = awsServerlessExpress.createServer(init());

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) };