const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const dotenv = require("dotenv");

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startApolloServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
        const res = await server.listen({ port: 5002 });
        console.log(`🚀 Server running at ${res.url}`);
    } catch (err) {
        console.error(err);
    }
}

startApolloServer();