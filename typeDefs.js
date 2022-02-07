const {gql}= require('apollo-server-express');

const typeDefs =gql`

type Author{
id: ID!
name: String!
age: Int!
books:[Book]
data:[Author]
}

type Book {
id:ID!
name:String
genre:String!
authorId:ID!
author:Author!
}

type ResultTypeBook{
data:[Book]
status:Int!
message:String!
error:String!
}
type ResultTypeAuthor{
data:[Author]
status:Int!
message:String!
error:String!
}


type Query{
    books:ResultTypeBook
    authors:ResultTypeAuthor
    author(id:ID!):ResultTypeAuthor
    book(id:ID!):ResultTypeBook
}

type MutationResult{
status:Int!
message:String!
error:String!
}


type Mutation{
addBook(input:AddBookInput!):MutationResult!
addAuthor(input:AddAuthorInput!):MutationResult!
deleteBook(id:ID!):MutationResult!
deleteAuthor(id:ID!):MutationResult!
updateBook(id:ID!,input:UpdateBookInput!):MutationResult!
updateAuthor(id:ID!,input:UpdateAuthorInput!):MutationResult!
}


input AddBookInput{
    name:String!
    genre:String!
    authorId:ID!
}
input AddAuthorInput{
    name: String!
    age: Int!
}
input UpdateBookInput{
    name:String
    genre:String
    authorId:ID

}
input UpdateAuthorInput{
    name: String
    age: Int
}








`
module.exports=typeDefs;
