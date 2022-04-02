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
    //one to many
    club:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"   
    },
});

module.exports = mongoose.model('Players', PlayerSchema);