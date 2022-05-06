const User = require('../models/user');
const Movie = require('../models/movie');
const mongoose = require('mongoose');

// sends the locally stored movie list
module.exports.movieList = async (req, res)=>{
    const movie = await Movie.find({});
    return res.status(200).json({
        movieList: movie
    });
}

module.exports.rateMovie = async (req, res)=>{
    if(req.body.rating>5||req.body.rating<=0){
        res.status(400).json({message: "Invalid rating, add value between 1 to 5"});
    }
    try{
        // Finds the movie with params.id
        const movie = await Movie.findById(req.params.id);
        const user = await User.findById(req.user._id);
        // Stores the ratings array in local variable and iterates through the variable 
        const ratingsArray = movie.ratings;
        
        ratingsArray.forEach(async (element) => {
            // when current object's by(user id) matches we are pulling the previous entry rom the database
            if(user._id.valueOf()===element.by.valueOf()){
                await Movie.findByIdAndUpdate(req.params.id, {$pull: {ratings: {_id: element._id}}});
            }
        });
        // creating a fresh new update entry
        const newValue = {
            by: user,
            value: req.body.rating
        }
        // pushing the update to the database and saving it
        await movie.ratings.push(newValue);
        await movie.save();
        return res.status(200).json({
            message: "Rating submitted successfully",
        });
    }catch(err){
        // Handling Error
        console.log("Error ", err);
        res.status(400).json({message: "Invalid Input check Movie ID/body "});
    }
    
}

module.exports.openList = async (req, res)=>{
    // fetching all the movies
    const movies = await Movie.find({});
    const display = [];
    // iterating through the movies array
    await movies.forEach(async eachMovie=>{
        let tot = 0;
        const elementLen = eachMovie.ratings.length;
        // iterating through the ratings and finding the total value to get a rating
        await eachMovie.ratings.forEach((element)=>{
            tot+=element.value;
        });
        const update = {
            title: eachMovie.title,
            rating: tot==0 ? "NA" : parseFloat(tot/elementLen).toFixed(2)
        }
        display.push(update);
    });
    res.status(200).json(display);
}

module.exports.search = async (req, res)=>{
    try{
        const movie = await Movie.findOne({title: req.body.movie});
        if(movie){
            return res.status(200).json(movie);
        }else{
            const toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
            const input = toTitleCase(req.body.movie);
            const moviesId = new Set();
            let collectMovies1 = await Movie.aggregate( [ { $match: { $text: { $search: input } } }
            ,{ $sort: { score: { $meta: "textScore" } } }, ] );
            let input2 = input.split(" ");
            const result = new Set();
            if(collectMovies1.length==0){
                input2.forEach((element)=>{
                    // Collect all the non empty substring and store it in a set 
                    for(let i = 0; i < input.length; i++){
                        for(let j = input.length; j > i ; j--){
                            let str = element.slice(i, j)
                            if(str!=='')
                            result.add(str);
                        }
                    }
                });
                // Copy the set to an array so that you can sort the array on length as a parameter.
                const resultArray = [];
                result.forEach((element1)=>{resultArray.push(element1);});
                resultArray.sort(function(a, b){return b.length - a.length;});
                let collectMovies2 = [];
                for(let i = 0; i < resultArray.length; i++){
                    const mv = await Movie.find({title: {$regex: resultArray[i]}});
                    if(mv.length==0)
                        continue;
                    collectMovies2.push(mv);
                    break;
                }
                return res.status(200).json(collectMovies2);
            }else{
                return res.status(200).json(collectMovies1);
            }
            
        } 
    }catch(err){
        return res.status(400).json({message: "Internal Server Error Please try again"});
    }
}