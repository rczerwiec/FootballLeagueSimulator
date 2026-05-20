import User from "../models/User.js"

export const createUser = async (req,res) => {
    console.log(req.body);
    try{
        const user = new User({
            firebaseID: req.body.user.uid,
            type: req.body.type,
            email: req.body.user.email,
        })
        await user.save();
        console.log("Pomyslnie utworzono uzytkownika");
        return res.status(200).json(user);
    }
    catch(err){
        console.log("Blad podczas tworzenia uzytkownika", err);
        return res.json(err)
    }

}

export const getUser = async (req,res) => {
    console.log(req.params);
    try{
        const user = await User.findOne({firebaseID: req.params.userId}).populate("leagues");
        console.log("Pomyslnie pobrano uzytkownika");
        return res.status(200).json(user);
    }
    catch(err){
        console.log("Blad podczas pobierania uzytkownika", err);
        return res.json(err);
    }
}