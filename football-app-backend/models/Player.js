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
        ref: "Clubs",
    },
    age:{
        type: Number,
        default:16,
        require:true,
    },
    overall:{
        type: Number,
        require:true
    }
});

module.exports = mongoose.model('Players', PlayerSchema);