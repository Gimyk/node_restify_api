const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.plugin(timestamp); // this will add a timestamp of created and updated

const User = mongoose.model('User', UserSchema);
module.exports = User;