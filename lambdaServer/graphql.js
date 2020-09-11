const { ApolloServer, gql } = require('apollo-server-lambda');

const books = [
  {id: 1, title: "Global Shift", author: "Peter Dicken"},
  {id: 2, title: "Miracles of the Qur'an", author: "Harun Yahya"},
  {id: 3, title: "The Beginning of Guidance", author: "Abu Hamid Al-Ghazali"},
  {id: 4, title: "Hunt for Red October", author: "Tom Clancy"},
  {id: 5, title: "Sum of All Fears", author: "Tom Clancy"},
  
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(id: Int!, title: String!, author: String!): Book!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = {
        id: args.id,
        title: args.title,
        author: args.author
      };

      let existflag = false;

      books.map(book => {
        if(book.id === newBook.id && book.title === newBook.title && book.author === newBook.author) {
          existflag = true;
          return;
        } else {
          return;
        }
      });
      
      if (existflag) {
        throw new Error("Book Already in List.");
      } else {
        books.push(newBook);
        return newBook;
      }
      
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*',
    credentials: true,
  },
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
