const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    phone:{
        type: String
    },
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);