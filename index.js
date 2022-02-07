const express = require("express");
const {ApolloServer} = require('apollo-server-express');
require("dotenv").config();


const typeDefs= require('./typeDefs');
const {Query,Author,Book}= require('./resolvers');
const {Mutation} = require('./mutations')

async function startServer(){

const app = express();
const apolloServer = new ApolloServer({
   typeDefs,
   resolvers: {
    Mutation,       //Mutation functionalities
    Query,          //Queries
    Book,           //table1
    Author,         //table2
  },  
});
await apolloServer.start();
apolloServer.applyMiddleware({app});
app.use((req,res)=>{
    res.send('hello from apollo');
})
const port = process.env.PORT || 3000;

app.use(error404Handler);
app.use(errorHandler);

//404 error handler
function error404Handler(req, res, next) {
    next("no route was found!");
}
//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        next("There was a problem in streaming!!");
    } else {
        if (err.message) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: err });
        }
    }
}
app.listen(port, () => {
    console.log(`connection established at port ${port} `);
});

}
startServer();




