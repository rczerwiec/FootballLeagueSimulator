import mongoose from "mongoose";

const LeagueTableSchema = mongoose.Schema({
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues"
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    clubName: {
        type: String,
        required: true
    },
    playedGames: {
        type: Number,
        default: 0
    },
    wonGames: {
        type: Number,
        default: 0
    },
    drawGames: {
        type: Number,
        default: 0
    },
    lostGames: {
        type: Number,
        default: 0
    },
    goalsShot: {
        type: Number,
        default: 0
    },
    goalsLost: {
        type: Number,
        default: 0
    },
    goalsDif: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
})

export default mongoose.model('LeagueTable', LeagueTableSchema);