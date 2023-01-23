import mongoose from 'mongoose';


const SeasonSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    firstLeague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues",
        require: true,
    }],
    secondLeague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues",
        require: true,
    }],
    thirdLeague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues",
    }],
    fourthLeague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues",
    }],
    fifthLeague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leagues",
    }],
})

export default mongoose.model('Season', SeasonSchema);