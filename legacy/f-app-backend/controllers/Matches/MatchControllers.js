import Match from "../../models/Match.js";
import Club from "../../models/Club.js";
import User from "../../models/User.js";
import League from "../../models/League.js";
import {calculateTeamsPosition} from "./utils/calculateTeamsInLeaguePosition.js"

//router.get("/friendly", getAllFriendlyMatches)
export const getAllFriendlyMatches = async (req, res) => {
  const firebaseUID = req.socket._httpMessage.locals.firebaseuid;
  console.log("pobiera mecze towarzyskie");
  try {
    const club = await User.findOne({ firebaseID: firebaseUID }).populate(
      "friendlyMatches"
    );

    console.log(
      "getAllFriendlyMatches>>".magenta,
      "Pomyslnie pobrano mecze towarzyskie".green
    );
    res.json(club.friendlyMatches);
  } catch (err) {
    console.log(
      "getAllFriendlyMatches>>".magenta,
      "Blad podczas pobierania meczy towarzyskich".red
    );
    res.json(err);
  }
};

export const updateLeagueMatch = async (req, res) => {
  console.log(req.body);
  try {
    const clubHome = await Club.findById(req.body.match.clubHome);
    const clubAway = await Club.findById(req.body.match.clubAway);
    const match = await Match.updateOne(
      { _id: req.params.matchId },
      {
        $set: {
          scoreHome: req.body.match.scoreHome,
          scoreAway: req.body.match.scoreAway,
          complete: req.body.match.complete,
          winner: req.body.winner,
        },
      }
    );
    clubHome.matches.push(req.body.match);
    clubAway.matches.push(req.body.match);
    if (req.body.winner === req.body.match.clubHome) {
      clubHome.wins += 1;
      clubAway.lost += 1;
    } else if (req.body.winner === req.body.match.clubAway) {
      clubAway.wins += 1;
      clubHome.lost += 1;
    } else {
      clubAway.draws += 1;
      clubHome.draws += 1;
    }
    clubHome.save();
    clubAway.save();
    // console.log(clubHome)
    // console.log(clubAway)
    // console.log(match);
    // console.log(req.body)
    const league = await League.findById(req.body.league._id)
      .populate("matches")
      .populate("tables");
    let allMatchesComplete = true;
    let results;
    await league.matches.forEach((m) => {
      if (m.complete === false) {
        allMatchesComplete = false;
      }
    });
    if (allMatchesComplete) {
    results = calculateTeamsPosition(league);
      console.log(results);
      await League.updateOne(
        { _id: req.body.league._id },
        { $set: { complete: true } }
      );
    }
    console.log(
      "updateLeagueMatch>>".magenta,
      "Pomyslnie zaaktualizowano mecz ligowy".green
    );
    res.json(results);
  } catch (err) {
    console.log(
      "updateLeagueMatch>>".magenta,
      "Blad podczas aktualizacji meczu ligowego".red,
      err
    );
    res.json({ message: err });
  }
};

export const createFriendlyMatch = async (req, res) => {
  const firebaseUID = req.socket._httpMessage.locals.firebaseuid;

  try {
    const match = new Match({
      matchType: "Towarzyski",
      clubHome: req.body.firstClub.id,
      clubHomeName: req.body.firstClub.name,
      clubHomePlayers: req.body.firstClub.players,
      clubAway: req.body.secondClub.id,
      clubAwayName: req.body.secondClub.name,
      clubAwayPlayers: req.body.secondClub.players,
      scoreHome: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      scoreAway: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      complete: true,
    });

    const firstClub = await Club.findById(req.body.firstClub.id);
    await firstClub.matches.push(match);
    await firstClub.save();
    const secondClub = await Club.findById(req.body.secondClub.id);
    await secondClub.matches.push(match);
    await secondClub.save();
    //console.log(firstClub);

    await match.save();
    await User.updateOne(
      { firebaseID: firebaseUID },
      { $push: { friendlyMatches: match } }
    );
    console.log(
      "createFriendlyMatch>>".magenta,
      "Pomyslnie wygenerowano mecz towarzyski".green
    );
    res.json(match);
  } catch (err) {
    console.log(
      "createFriendlyMatch>>".magenta,
      "Blad podczas generowania meczu towarzyskiego".red
    );
    res.json({ message: err });
  }
};
