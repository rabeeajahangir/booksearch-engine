const express = require('express');
//import Apollo server
const { ApolloServer } = require('apollo-server-express')
const path = require('path');

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
//import JWT middleware
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

//new Apollo server
async function startApolloServer() {
   const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: authMiddleware
   })
   await server.start();
 
   server.applyMiddleware({ app })
 
   app.use(express.urlencoded({ extended: false }));
   app.use(express.json());
 
   if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../client/build')));
   }
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../client/build/index.html'))
   })
   // app.use(routes);
 
   db.once('open', () => {
     app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
   });
 }
 
 startApolloServer();