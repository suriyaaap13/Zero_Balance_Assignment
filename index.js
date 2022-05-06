// requiring library
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

//////////////////////////// Middleware /////////////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/////////////////////// Route Middleware ///////////////////////
app.use('/', require('./routes'));

app.listen(3000, (err)=>{
    if(err){console.log("Error",err);}
    console.log("Server is up and running in PORT 3000");
})