const Book = require('../models/Book');
const { GraphQLError } = require('graphql');
const { validateInput } = require('../utils/helper');

const resolvers = {
    Query: {
        async book(_, { ID }) {
            if (!ID) throw new GraphQLError('No ID has been provided');

            const book = await Book.findById(ID);

            if (!book) throw new GraphQLError('No book found with the provided ID');

            return book;
        },
        async getBooks(_, { amount }) {
            if (!amount) {
                const books = await Book.find();

                return books;
            } else {
                const books = await Book.find().sort({ createdAt: -1 }).limit(amount);

                return books;
            }
        },
        async getBookByTitle(_, { title }) {
            if (!title) throw new GraphQLError('No title has been provided');

            const books = await Book.find({ title });

            if (!books) throw new GraphQLError('No books found with the provided title');

            return books;
        },
        async getBookByAuthor(_, { author }) {
            if (!author) throw new GraphQLError('No author has been provided');

            const books = await Book.find({ author });

            if (!books) throw new GraphQLError('No books found with the provided author');

            return books;
        },
        async getBookByGenre(_, { genre }) {
            if (!genre) throw new GraphQLError('No genre has been provided');

            const books = await Book.find({ genre });

            if (!books) throw new GraphQLError('No books found with the provided genre');

            return books;
        },
    },

    Mutation: {
        async addBook(_, { bookInput: { title, author, publishedDate, genre } }) {

            validateInput(title, 'title');
            validateInput(author, 'author');
            validateInput(publishedDate, 'published date');
            validateInput(genre, 'genre');

            const newBook = new Book({
                title: title,
                author: author,
                publishedDate: publishedDate,
                genre: genre,
                createdAt: new Date().toISOString(),
            });

            const book = await newBook.save();

            return {
                id: book.id,
                ...book._doc,
            }
        },
        async deleteBook(_, { ID }) {
            if (!ID) throw new GraphQLError('No ID has been provided');

            const book = await Book.findById(ID);

            if (!book) throw new GraphQLError('No book found with the provided ID');

            const result = (await Book.deleteOne({ _id: ID })).deletedCount;

            return result > 0;
        },
        async updateBook(_, { ID, bookInput }) {
            if (!ID) throw new GraphQLError('No ID has been provided');

            const book = await Book.findById(ID);

            if (!book) throw new GraphQLError('No book found with the provided ID');

            try {
                const result = (await Book.updateOne({ _id: ID }, { ...bookInput })).modifiedCount;
                return result > 0;
            } catch (err) {
                throw new GraphQLError(err);
            }
        }
    }
}

module.exports = resolvers;