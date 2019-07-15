const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
    empType: {
        type: String,
        required: true
    },
    notes: {
        type: String,

    }
});

CustomerSchema.plugin(timestamp); // this will add a timestamp of created and updated

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;