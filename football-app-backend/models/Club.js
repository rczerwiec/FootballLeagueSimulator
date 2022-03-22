const mongoose = require('mongoose');

const ClubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    titles: {
        type: Number,
        required: true,
        default: 0
    },
    world_championships: {
        type: Number,
        required: true,
        default: 0
    },
    region_championships: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Clubs', ClubSchema);