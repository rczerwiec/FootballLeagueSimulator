import mongoose from 'mongoose';


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
    }],
    complete: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model('Leagues', LeagueSchema);