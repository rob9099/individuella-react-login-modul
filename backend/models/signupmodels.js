const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({

    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
        //minlength: 5
        //maxlength: 20
    },
    password: {
        type: String,
        required: true,
        //minlength: 5
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    token: {
        type: String,
        immutable: true
    }
});

module.exports = mongoose.model('users', signUpTemplate)