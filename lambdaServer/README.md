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
You can deploy your own GraphQL Server to AWS Lambda:
1. Replace the src/schema.js and src/resolvers.js with your GraphQL schema and resolvers.
2. Add AWS credentials to work with your DynamoDB Queries
3. Install serverless globally `npm i serverless`
4. Update serverless.yml with the appropriate functions and names
5. Run `npm install` then `npm run deploy`
