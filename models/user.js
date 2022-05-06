const mongoose = require('mongoose');

// Create user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        min: 6,
        max: 255
    }, 
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    attempts: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
        required: true,
        max: 100,
        min: 13
    },
    updates: [{
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        ratings: [{
            value: {
                type: Number,
                min: 1,
                max: 5
            },
            created_time: {
                type: String
            }
        }]
    }]
    
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;