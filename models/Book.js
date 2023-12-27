const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    title: String,
    author: String,
    createdAt: Date,
    publishedDate: Date,
    genre: String,
});

module.exports = model('Book', bookSchema);