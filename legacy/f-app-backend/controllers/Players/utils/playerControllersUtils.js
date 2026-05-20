import Club from "../../../models/Club.js";
import User from "../../../models/User.js";
import Player from "../../../models/Player.js";

export const createPlayerUtil = async(firebase, newPlayer ) => {
    const firebaseUID = firebase;

    const player = new Player({
        name: newPlayer.name,
        nationality: newPlayer.nationality,
        club: newPlayer.club,
        overall: newPlayer.overall
    })
    try{
        if(newPlayer.club !==undefined){
            const club = await Club.findById(String(player.club)).populate("players");
            console.log(player.club);
            if (club.players.length <= 4){
                const savedPlayer = await player.save();
                club.players.push(savedPlayer);
                console.log(club);
                let value = 0;
                club.players.forEach((p) => {
                    console.log(p);
                    value+=Number(p.overall)
                    console.log(value);
                })
                value = value/4;
                console.log(value);
                club.overall = value;
                await club.save();
                await User.updateOne({firebaseID: firebaseUID}, { $push: { players: player}})
                console.log("createPlayer>>".yellow,"Pomyslnie utworzono gracza i przypisano go do klubu".green)
                return savedPlayer
                
            }
            else{
                console.log("createPlayer>>".yellow,"Klub jest pelen".red)
                return {message: "Klub jest pełen"}
            }
        }
        else{
            player.club = undefined;
            const savedPlayer = await player.save();
            await User.updateOne({firebaseID: firebaseUID}, { $push: { players: player}})
            console.log("createPlayer>>".yellow,"Pomyslnie utworzono gracza bez klubu".green);
            return savedPlayer
            
        }

    }
    catch(err){
        console.log("createPlayer>>".yellow,"Blad podczas tworzenia klubu".red, err);
        return err;
    }
}