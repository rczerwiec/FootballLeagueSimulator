const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    nationality:{
        type: String,
        require: true
    },
    clubID:{
        type: String,
        require: false,
        default: 'undefined'
    },
});

module.exports = mongoose.model('Players', PlayerSchema);