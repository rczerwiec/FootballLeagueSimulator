import Club from "../models/Club.js";

//router.get('/', getAllClubs);
export const getAllClubs = async (req,res) => {
    try{
        const clubs = await Club.find();
        console.log("getAllClubs>>".blue,"Pomyślnie pobrano wszystkie kluby".green);
        res.json(clubs);
    }
    catch(err){
        console.log("getAllClubs>>".blue,"Blad podczas pobierania klubu".red);
        res.json({message:err});
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
        console.log(req.params.clubId);
        const club = await Club.findById(req.params.clubId).populate("players");
        //console.log(club);
        console.log("getAllClubPlayers>>".blue,"Pomyślnie pobrano wszystkich graczy z klubu".green)
        console.log(club);
        res.json(club);
    }
    catch(err){
        console.log("getAllClubPlayers>>".blue,"Blad podczas pobierania graczy z danego klubu".red);
        res.json({message:err});
    }
}

//router.post('/', createNewClub)
export const createNewClub = async (req,res) => {
    const club = new Club({
        name: req.body.name,
        type: req.body.type,
    })

    try{
        const savedClub = await club.save()
        console.log("createNewClub>>".blue,"Pomyślnie utworzono klub".green)
        res.json(savedClub);
    }
    catch(err){
        console.log("createNewClub>>".blue,"Blad podczas tworzenia klubu".red);
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

        await Club.remove({_id: req.params.clubId});
        console.log("deleteClub>>".blue,"Pomyslnie usunieto klub".green)
        res.json(club);
    }
    catch(err){
        console.log("deleteClub>>".blue,"Blad podczas usuwania klubu".red);
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
