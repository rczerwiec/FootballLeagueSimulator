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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    }],
    tables:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeagueClubStats"
    }],
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    second: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    third: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    fourth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    fifth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    thirdLast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    secondLast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
    last: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs"
    },
})

export default mongoose.model('Leagues', LeagueSchema);