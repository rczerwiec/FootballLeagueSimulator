import Club from "../models/Club.js";
import Player from "../models/Player.js";
import {faker} from '@faker-js/faker';
import User from "../models/User.js";

import { createPlayerUtil } from "./Players/utils/playerControllersUtils.js";

//router.get('/', getAllUserPlayers);
export const getAllUserPlayers = async (req,res) => {
    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;
    try{
        const user = await User.findOne({firebaseID: firebaseUID}).populate('players');
        console.log("getAllUserPlayers>>".yellow,"Pomyslnie pobrano wszystkich graczy".green);
        res.json(user.players);
    }
    catch(err){
        console.log("getAllUserPlayers>>".yellow,"Blad podczas pobierania wszystkich graczy".red);
        res.json({message:err});
    }
}

//router.post('/', createPlayer)
export const createPlayer = async (req,res) => {
    console.log("siema")
    
    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;

    const player = {
        name: req.body.name,
        nationality: req.body.nationality,
        club: req.body.club,
        overall: req.body.overall
    }
    const response = createPlayerUtil(firebaseUID, player)
    res.json(response);

}

//router.get('/:playerId', getPlayer)
export const getPlayer = async (req,res) => {
    try{
        const player = await Player.findById(req.params.playerId);
        console.log("getPlayer>>".yellow,"Pomyślnie wybrano danego gracza".green);
        res.json(player);
    }
    catch(err){
        console.log("getPlayer>>".yellow,"Blad podczas pobierania danego gracza".red);
        res.json({message:err});
    }

}

//router.get('/:playerId/club', getPlayerClub)
export const getPlayerClub = async (req,res) => {
    try{
        const player = await Player.findById(req.params.playerId).populate("club");
        //const club = await Club.findById(player.club.valueOf());
        console.log("getPlayerClub>>".yellow,"Pomyślnie pobrano klub gracza".green);
        res.json(player.club);
    }
    catch(err){
        console.log("getPlayerClub>>".yellow,"Blad podczas pobierania klubu gracza".red);
        res.json({message:err});
    }

}

//router.delete('/:playerId', deletePlayer)
export const deletePlayer = async (req,res) =>{
    const firebaseUID = req.socket._httpMessage.locals.firebaseuid;

    try{
        const player = await Player.findById(req.params.playerId);
        if(player.club !== undefined && player.club !== null){
            const club = await Club.findById(player.club.valueOf());
            await Player.deleteOne({_id:req.params.playerId});
            club.players.splice(club.players.indexOf(req.params.playerId),1);
            await club.save();
            const user = await User.findOne({firebaseID: firebaseUID}).populate("clubs");
            await user.players.forEach((p,index) => {
                if(String(p._id) === String(player._id)){
                    console.log("im here")
                    user.players.splice(index,1);
                    user.save();
                }
            })
            res.json(player);
            console.log("deletePlayer>>".yellow,"Pomyślnie usunięto gracza i jego dane z klubu".green);
        }
        else{
            await Player.deleteOne({_id:req.params.playerId});
            const user = await User.findOne({firebaseID: firebaseUID}).populate("clubs");
            await user.players.forEach((p,index) => {
                if(String(p._id) === String(player._id)){
                    console.log("im here")
                    user.players.splice(index,1);
                    user.save();
                }
            })
            res.json(player);
            console.log("deletePlayer>>".yellow,"Pomyślnie usunięto gracza".green);
        }
    }
    catch(err){
        console.log("deletePlayer>>".yellow,"Blad podczas usuwania gracza".red, err);
        res.json({message:err});
    }
}

//router.patch('/:playerId', updatePlayer)
export const updatePlayer = async(req,res)=>{
    try{
        console.log(req.params.playerId)
        const oldPlayer = await Player.findById(req.params.playerId).populate("club");
        if(oldPlayer.club!=null){
            oldPlayer.club.players.splice(oldPlayer.club.players.indexOf(req.params.playerId),1);
            await oldPlayer.club.save();
        }
        await Player.updateOne({_id: req.params.playerId},{$set : {name: req.body.name, nationality: req.body.nationality, club: req.body.club, overall: req.body.overall}});
        const player = await Player.findById(req.params.playerId).populate("club");
        player.club.players.push(player);
        await player.club.save();
        console.log("updatePlayer>>".yellow,"Pomyślnie zaaktualizowano gracza".green);
        res.json(player);
    }
    catch(err){
        console.log("updatePlayer>>".yellow,"Blad podczas aktualizacji gracza".red);
        res.json({message:err});
    }
}

//router.post('/generateMultiple',createRandomPlayers)
export const createRandomPlayers =  async(req,res) =>{
    //console.log(req.body);
    
    for(var i=0; i<req.body.howMuchToGenerate; i++){
        console.log(i);
        var randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1)

        const player = new Player({
            name: faker.name.firstName() + " " + faker.name.lastName(),
            nationality: faker.address.country(),
            overall: randomNumber
        })

        try{
            player.club = undefined;
            const savedPlayer = await player.save();
            //console.log(savedPlayer);
            
        }
        catch(err){
            console.log("createRandomPlayers>>".yellow,"Blad podczas generowania gracza".red);
            res.json({message: err});
        }
    }
    console.log("createRandomPlayers>>".yellow,"Pomyślnie wygenerowano graczy".green);
}