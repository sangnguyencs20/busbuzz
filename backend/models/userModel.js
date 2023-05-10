const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    fullName: {
        type: String,
        required: [true, 'Please enter your name']
    },
    history:{
        type: [mongoose.Schema.Types.ObjectId],
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);