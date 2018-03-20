// reference mongoose
const mongoose = require('mongoose');

//create make schema
const makeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:'Name is required'
    },
    country:{
        type: String,
        required:'Country is required'
    },
    yearFounded:{
        type: Number,
        required:'Year is required'
    },
});
//make it public
module.exports = mongoose.model('Make', makeSchema);