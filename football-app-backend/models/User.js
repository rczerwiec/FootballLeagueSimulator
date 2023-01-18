import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firebaseID:{
        type: String,
        require: true,
    },
    type: {
       type: String,
       require: true, 
    },
    email: {
        type: String,
        require: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    }],
    leagues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues"
    }],
    leagueClubStats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeagueClubStats"
    }],
    registeredAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('User', UserSchema);
