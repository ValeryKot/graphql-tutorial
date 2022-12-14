const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const {databaseUri} = require("./../models/config");

const app = express();
const PORT = 3005;

mongoose.set('strictQuery', true);

mongoose.connect(
  databaseUri,
  { useNewUrlParser: true, useUnifiedTopology: true, }
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
); 

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, (err) => {
  err ? console.log(error) : console.log('Server started!');
});
