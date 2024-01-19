const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        
    },
    prenom: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
        min: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("user", UserSchema)