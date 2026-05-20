import Club from "../models/Club.js";
import User from "../models/User.js";
import { createPlayerUtil } from "./Players/utils/playerControllersUtils.js";
import { namesPL, surnamesPL } from "../statics/playerNames.js";


//router.get('/', getAllUserClubs);
export const getAllUserClubs = async (req,res) => {
    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;
    try{
        const user = await User.findOne({firebaseID: firebaseUID}).populate("clubs")
        //console.log(user.clubs);

        console.log("getAllUserClubs>>".blue,"Pomyślnie pobrano wszystkie kluby użytkownika".green);
        res.json(user.clubs)
    }
    catch(err){
        console.log("getAllUserClubs>>".blue,"Blad podczas pobierania klubow uzytkownika".red);
        return res.json({message:err});
    }
}

//router.get('/:clubId/matches', getAllClubMatches)
export const getAllClubMatches = async (req,res) => {
    try{
        const matches = await Club.findById(req.params.clubId).populate("matches");
        console.log("getAllClubMatches>>".blue,"Pomyślnie pobrano wszystkie mecze klubu".green);
        res.json(matches);
    }
    catch(err){
        console.log("getAllClubMatches>>".blue,"Blad podczas pobierania meczy klubu".red, err);
        res.json({message:err});
    }
}


//router.get('/:clubId/players', getAllClubPlayers)
export const getAllClubPlayers = async (req,res) =>{
    try{
        //console.log(req.params.clubId);
        const club = await Club.findById(req.params.clubId).populate("players");
        //console.log(club);
        console.log("getAllClubPlayers>>".blue,"Pomyślnie pobrano wszystkich graczy z klubu".green)
        //console.log(club);
        res.json(club);
    }
    catch(err){
        console.log("getAllClubPlayers>>".blue,"Blad podczas pobierania graczy z danego klubu".red);
        res.json({message:err});
    }
}

//router.post('/', createNewClub)
export const createNewClub = async (req,res) => {

    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;

    try{
        const club = new Club({
            name: req.body.name,
            type: req.body.type,
        })
        
        await User.updateOne({firebaseID: firebaseUID}, { $push: { clubs: club}})
        const savedClub = await club.save()
        if(req.body.generatePlayers === true){
            for (let x=0; x<4; x++){
                const name = namesPL[Math.floor(Math.random() * namesPL.length)]
                const surname = surnamesPL[Math.floor(Math.random() * surnamesPL.length)]
                const nationality = "Poland";
                const overall = Math.floor(Math.random() * 99)
                const player = {
                    name:name + " " + surname,
                    nationality,
                    overall,
                    club: String(club._id)
                }
                await createPlayerUtil(firebaseUID,player)
            }
            console.log("createNewClub>>".blue,"Wygenerowano graczy dla klubu".green)
        }
        console.log("createNewClub>>".blue,"Pomyślnie utworzono klub".green)
        res.json(savedClub);
    }
    catch(err){
        console.log("createNewClub>>".blue,"Blad podczas tworzenia klubu".red, err);
        res.json({message: err});
    }

}

//router.get('/:clubId', getClub)
export const getClub = async (req,res) => {
    try{
        const club = await Club.findById(req.params.clubId);
        console.log("getClub>>".blue,"Pomyślnie pobrano jeden wybrany klub".green)
        res.json(club);
    }
    catch(err){
        console.log("getClub>>".blue,"Blad podczas pobierania jednego klubu".red);
        res.json({message:err});
    }
}

//router.delete('/:clubId', deleteClub)
export const deleteClub = async (req,res) => {
    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;

    try{
        const club = await Club.findById(req.params.clubId).populate("players").populate("matches");
        //console.log(club);
        club.players.forEach((e) => {
            console.log(e.club);
            e.club = undefined;
            e.save();
        })
        club.matches.forEach(async (e) => {
            await Match.deleteOne({_id: e._id});
        })
        const user = await User.findOne({firebaseID: firebaseUID}).populate("clubs");
        await user.clubs.forEach((c,index) => {
            if(String(c._id) === String(club._id)){
                console.log("im here")
                user.clubs.splice(index,1);
                user.save();
            }
        })

        await Club.remove({_id: req.params.clubId});
        console.log("deleteClub>>".blue,"Pomyslnie usunieto klub".green)
        res.json(club);
    }
    catch(err){
        console.log("deleteClub>>".blue,"Blad podczas usuwania klubu".red, err);
        res.json({message:err});
    }
    
}

//router.patch('/:clubId',updateClub)
export const updateClub = async (req, res) => {
    try{
        const updatedClub =  await Club.updateOne({_id: req.params.clubId},{$set : {name: req.body.name, type: req.body.type}});
        console.log("updateClub>>".blue,"Pomyslnie zaaktualizowano klub".green)
        res.json(updatedClub);
    }
    catch(err){
        console.log("updateClub>>".blue,"Blad aktualizowania klubu".red);
        res.json({message:err});
    }
}
