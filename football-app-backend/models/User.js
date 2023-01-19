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
    leagues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues"
    }],
    registeredAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('User', UserSchema);
