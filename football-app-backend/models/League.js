const mongoose = require('mongoose');


const LeagueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    //one to many
    clubs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    }],
    maxTeams: {
        type: Number,
        required: true,
        default: 8
    },
    matches:[{
    }]
})

module.exports = mongoose.model('Leagues', LeagueSchema);