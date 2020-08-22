const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors())

mongoose.connect('mongodb+srv://Heth_Gala:Hethgala123@cluster0.f0q8h.mongodb.net/<dbname>?retryWrites=true&w=majority')

mongoose.connection.on('open', () => {
    console.log('Connected to db')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening to port 4000')
})
