var mongoose = require('mongoose');
mongoose.Promise = global.Promise

var externalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0.0,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    internal_id: {
        type: Number,
        required: true
    }
});

var internalSchema = new mongoose.Schema({
    internal_id:{
        type: Number,
        required: true
    },
    preview:{
        type: String,
        required: true
    },
    date: {
         type: Number,         
         required: true
    },
    display_date: {
        type: String,
        required: true
    }
});

var External = mongoose.model('External', externalSchema);
var Internal = mongoose.model('Internal', internalSchema);

module.exports = {
    External: External,
    Internal: Internal
};