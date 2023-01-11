import mongoose from 'mongoose';


const MatchSchema = mongoose.Schema({
    matchType:{
        type:String,
        required:true,
    },
    clubHome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
        required:true,
    },
    clubHomeName: {
        type: String,
    },
    clubHomePlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
    clubAway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
        required:true,
    },
    clubAwayName: {
        type: String,
    },
    clubAwayPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
    scoreHome: {
        type: Number,
    },
    scoreAway: {
        type: Number,
    },
    complete: {
        type: Boolean
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
    }
})

export default mongoose.model('Match', MatchSchema);