import LeagueClubStats from "../../models/LeagueClubStats.js";
import updateClub from "./utils/updateClubs.js";

//router.get("/:leagueId", getLeagueClubStats);
export const getLeagueClubStats = async (req, res) => {
    try {
      const table = await LeagueClubStats.find({ leagues: req.params.leagueId });
  
      console.log("getLeagueClubStats>>".cyan,"Pomyslnie pobrano statystyki klubu dla danej ligi".green);
      res.json(table); 
    } catch (err) {
      console.log("getLeagueClubStats>>".cyan,"Blad podczas pobierania statystyki klubu dla danej ligi".red);
      res.json(err);
    }
  }

//router.post("", createNewLeagueClubStats); 
export const createNewLeagueClubStats = async (req, res) => {
    try {
      const table = new LeagueClubStats({
        league: req.body.leagueId,
        club: req.body.clubId,
        clubName: req.body.clubName,
      });
      console.log("createNewLeagueClubStats>>".cyan,"Pomyslnie utworzono statystyki klubu dla ligi".green);
      res.json(table);
    } catch (err) {
      console.log("createNewLeagueClubStats>>".cyan,"Blad podczas tworzenia statystyki klubu dla ligi".red);
      res.json({ message: err });
    }
  }

//router.patch("/:leagueId/:clubId",updateLeagueClubStats );
export const updateLeagueClubStats = async (req, res) => {
    try {
      const table = await LeagueClubStats.findOne({
        league: req.params.leagueId,
        club: req.params.clubId,
      });
      //If club draw
      //console.log(req.body.match);
      //console.log(req.body.club);
  
      let type;
      let home;
      if (req.body.club == req.body.match.clubHome) {
        if (parseInt(req.body.match.scoreHome) > parseInt(req.body.match.scoreAway)) {
          type = "winner";
          home = true;
        } else if (parseInt(req.body.match.scoreAway) > parseInt(req.body.match.scoreHome)) {
          type = "loser";
          home = true;
        } else {
          type = "draw";
          home = true;
        }
      } else {
          if (parseInt(req.body.match.scoreHome) > parseInt(req.body.match.scoreAway)) {
              type = "loser";
              home = false;
            } else if (parseInt(req.body.match.scoreAway) > parseInt(req.body.match.scoreHome)) {
              type = "winner";
              home = false;
            } else {
              type = "draw";
              home = false;
            }
      }
      updateClub(type,home,table,req.body.match)
      
      console.log("updateLeagueClubStats>>".cyan,"Pomyslnie zaaktualizowano statystyki klubu dla ligi i sam klub.".green);
      res.json(table);
    } catch (err) {
      console.log("updateLeagueClubStats>>".cyan,"Blad podczas aktualizowania statystyk klubu dla ligi i samego klubu".green);
      res.json({ message: err });
    }
  }  