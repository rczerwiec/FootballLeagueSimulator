import User from "../models/User.js";

export const getUserSeasons = async(req,res) => {
    try{
        const user = await User.findOne({firebaseID:req.params.userId}).populate("leagues");
        console.log(user);

        console.log("Pomyslnie pobrano sezony");
        res.json(user);
    }
    catch(err){
        console.log("Blad podczas pobierania sezonow",err);
        res.json(err);
    }
}