const { gql } = require('apollo-server-fastify');

module.exports = gql`
  type Driver {
    driver: String!
    f1constructor: String!
    pointsCumulative: [Int!]
    totalPoints: Int
  }

  type Comment {
    comment: String!
    id: String!
  }

  type Query {
    f1drivers: [Driver!]
    f1driverfilter(f1constructor: [String!]): [Driver!]
    f1driver(driver: String!): Driver!
    f1comments: [Comment!]
  }

  type Mutation {
    addf1comment(comment: String!): Comment
    deletef1comment(id:String!): Comment
  }

  type Subscription {
    newComment: Comment!
  }
`;
