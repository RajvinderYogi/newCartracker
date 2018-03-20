const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');
const findOrCreate = require('mongoose-find-or-create');

const userSchema = new mongoose.Schema({
    phone:{
        type: String,
        googleId: String
    },
});

userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);