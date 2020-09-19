# README #

Running a GraphQL server instance from AWS Lambda

### More on the Stack ###

* GraphQL API
* Apollo Server
* AWS Lambda
* Serverless

### Intention ###

The goal of this project is to understand serverless architecture and to build a serverless GraphQL API. By employing `apollo-server-lambda` package 

Find the instance here: https://lnngrtos05.execute-api.us-east-2.amazonaws.com/dev/graphql

### Usage ###
You can deploy your own Apollo GraphQL Server to AWS Lambda:
* Clone this directory.
* Replace _src/schema.js_ and _src/resolvers.js_ with your GraphQL schema and resolvers.
* Add AWS credentials to work with your DynamoDB Queries, in this project it is incorporated through a config file.
* Install serverless globally `npm i -g serverless`
* Update serverless.yml with the appropriate functions and names
* Run `npm install` then `npm run deploy`
  * The deploy script will write the log to *serverless_notes.txt*
  * Connect to your deployed server with the endpoint url.
