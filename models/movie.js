const mongoose = require('mongoose');

// Create user model
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        required: true
    },
    ratings: [{
        by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        value: {
            type: Number,
            min: 1,
            max: 5
        }
    }]
});

movieSchema.index({ title: 'text' });
const Movie = mongoose.model('Movie', movieSchema);
Movie.createIndexes();
module.exports = Movie;