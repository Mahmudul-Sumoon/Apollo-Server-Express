const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book]
  }
  type Book {
    id: ID!
    name: String
    genre: String!
    authorId: ID!
    author: Author!
  }
  type Query {
    books: [Book]
    authors: [Author]
    author(id: ID!): Author
    book(id: ID!): Book
  }
  type Mutation {
    addBook(input: AddBookInput!): Book!
    addAuthor(input: AddAuthorInput!): Author!
    deleteBook(id: ID!): String!
    deleteAuthor(id: ID!): String!
    updateBook(id: ID!, input: UpdateBookInput!): String!
    updateAuthor(id: ID!, input: UpdateAuthorInput!): String!
  }
  input AddBookInput {
    name: String!
    genre: String!
    authorId: ID!
  }
  input AddAuthorInput {
    name: String!
    age: Int!
  }
  input UpdateBookInput {
    name: String
    genre: String
    authorId: ID
  }
  input UpdateAuthorInput {
    name: String
    age: Int
  }
`;
module.exports = typeDefs;
