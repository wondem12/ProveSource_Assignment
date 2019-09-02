
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')

const config = require('./config/default');

const app = express();

const accountRoute = require('./api/account/create');



mongoose.connect(config.db, {useNewUrlParser: true})
.then(()=>{
  console.log('connecting to dataBase')
})
.catch(()=>{
  console.log('Connection failed');
})

app.use(bodyParser.json());
app.use(cors());


app.use('/api/account', accountRoute);



app.listen(config.port, () =>
  console.log (`Listening on port ${config.port}...`)
);

module.exports = app