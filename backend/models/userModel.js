const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    fullname: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    history:{
        type: [mongoose.Schema.Types.ObjectId],
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);