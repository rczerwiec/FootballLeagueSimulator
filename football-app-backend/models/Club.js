import mongoose from 'mongoose';


const ClubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    //one to many
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
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
    },
    overall: {
        type: Number,
        default: 1
    },
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    }],
    wins: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Clubs', ClubSchema);