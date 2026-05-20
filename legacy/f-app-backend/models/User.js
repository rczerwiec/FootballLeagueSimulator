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
    season: {
        type: Number,
        default: 2023
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    }],
    friendlyMatches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    }],
    leagues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues"
    }],
    seasons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season"
    }],
    registeredAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('User', UserSchema);
