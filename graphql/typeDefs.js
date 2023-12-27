const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        title: String
        author: String
        publishedDate: String
        genre: String
    }

    input BookInput {
        title: String
        author: String
        publishedDate: String
        genre: String
    }

    type Query {
        book(ID: ID!): Book!
        getBooks(amount: Int): [Book]
        getBookByTitle(title: String): [Book]
        getBookByAuthor(author: String): [Book]
        getBookByGenre(genre: String): [Book]
    }

    type Mutation {
        addBook(bookInput: BookInput): Book!
        deleteBook(ID: ID!): Boolean
        updateBook(ID: ID!, bookInput: BookInput): Boolean
    }
`


module.exports = typeDefs;