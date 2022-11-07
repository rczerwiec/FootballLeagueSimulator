import mongoose from 'mongoose';


const MatchSchema = mongoose.Schema({
    clubHome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
        required:true,
    },
    clubAway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
        required:true,
    },
    scoreHome: {
        type: Number,
    },
    scoreAway: {
        type: Number,
    },
})

export default mongoose.model('Match', MatchSchema);