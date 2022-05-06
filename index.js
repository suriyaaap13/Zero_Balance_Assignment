// requiring library
require('dotenv').config();
const express = require('express');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const User = require('./models/user');
const Movie = require('./models/movie');

const app = express();

//////////////////////////// Middleware /////////////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// fetching api data
async function APIDRAMA() {
    // fetches all the movies in the database
    const movieCheck = await Movie.find({});
    // data there is no movies in the data base go and fetch the data otherwise don't fetch.
    if(!movieCheck[0]){
        //////////////////// Make a request for a user with a given ID///////////
        const api = [
            `https://api.themoviedb.org/4/list/10?page=1&api_key=${process.env.API_KEY}`,
            `https://api.themoviedb.org/4/list/10?page=2&api_key=${process.env.API_KEY}`,
            `https://api.themoviedb.org/4/list/10?page=3&api_key=${process.env.API_KEY}`
        ]
        api.forEach((link)=>{
        axios.get(link)
            .then( function (response) {
             response.data.results.forEach(async (element, index)=>{
                try{
                await Movie.create(element);
                }catch(err){
                console.log('Error ', err);
                }
            });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        });
        
    }
}
APIDRAMA();

/////////////////////// Route Middleware ///////////////////////
app.use('/', require('./routes'));

app.listen(3000, (err)=>{
    if(err){console.log("Error",err);}
    console.log("Server is up and running in PORT 3000");
})