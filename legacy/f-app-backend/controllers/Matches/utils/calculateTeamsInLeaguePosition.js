export function calculateTeamsPosition(league) {
  const leagueCopy = [...league.tables];
  const leagueCopy2 = [...league.tables];
  let firstPlace;
  let secondPlace;
  let thirdPlace;
  let fourthPlace;
  let fifthPlace;
  let lastPlace;
  let secondToLastPlace;
  let thirdLastPlace;

  for (let i = 0; i < 5; i++) {
    let maxPoints = 0;
    let maxGoalsDif = 0;
    let maxWonGames = 0;
    let maxGoalsShot = 0;
    let teamIndex = 0;
    leagueCopy.forEach((t, index) => {
      //zakładam że nie będzie dwóch identycznych wyników gdzie punkty=punkty i roznicagoli = roznicagoli, pozniej zabezpiecze
      if (
        maxPoints < t.points ||
        (maxPoints === t.points && maxGoalsDif < t.goalsDif) ||
        (maxPoints === t.points &&
          maxGoalsDif === t.goalsDif &&
          maxWonGames < t.wonGames) ||
        (maxPoints === t.points &&
          maxGoalsDif === t.goalsDif &&
          maxWonGames === t.wonGames &&
          maxGoalsShot < t.goalsShot)
      ) {
        if (i === 0) {
          maxPoints = t.points;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          maxGoalsDif = t.goalsDif;
          firstPlace = t;
          teamIndex = index;
        } else if (i === 1) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          secondPlace = t;
          teamIndex = index;
        } else if (i === 2) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          thirdPlace = t;
          teamIndex = index;
        } else if (i === 3) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          fourthPlace = t;
          teamIndex = index;
        } else if (i === 4) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          fifthPlace = t;
          teamIndex = index;
        }
      }
    });
    leagueCopy.splice(teamIndex, 1);
  }
  //LAST 3 TEAMS
  for (let i = 0; i < 3; i++) {
    let maxPoints = 0;
    let maxGoalsDif = 0;
    let maxWonGames = 0;
    let maxGoalsShot = 0;
    let teamIndex = 0;
    leagueCopy2.forEach((t, index) => {
      //zakładam że nie będzie dwóch identycznych wyników gdzie punkty=punkty i roznicagoli = roznicagoli, pozniej zabezpiecze
      if (index === 0) {
        maxPoints = t.points;
        maxWonGames = t.wonGames;
        maxGoalsShot = t.goalsShot;
        maxGoalsDif = t.goalsDif;
        teamIndex = index;
        if (i === 0) {
          lastPlace = t;
        } else if (i === 1) {
          secondToLastPlace = t;
        } else if (i === 2) {
          thirdLastPlace = t;
        }
      } else if (
        maxPoints > t.points ||
        (maxPoints === t.points && maxGoalsDif > t.goalsDif) ||
        (maxPoints === t.points &&
          maxGoalsDif === t.goalsDif &&
          maxWonGames > t.wonGames) ||
        (maxPoints === t.points &&
          maxGoalsDif === t.goalsDif &&
          maxWonGames === t.wonGames &&
          maxGoalsShot > t.goalsShot)
      ) {
        if (i === 0) {
          maxPoints = t.points;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          maxGoalsDif = t.goalsDif;
          lastPlace = t;
          teamIndex = index;
        } else if (i === 1) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          secondToLastPlace = t;
          teamIndex = index;
        } else if (i === 2) {
          maxPoints = t.points;
          maxGoalsDif = t.goalsDif;
          maxWonGames = t.wonGames;
          maxGoalsShot = t.goalsShot;
          thirdLastPlace = t;
          teamIndex = index;
        }
      }
    });
    leagueCopy2.splice(teamIndex, 1);
  }
  let results = {
    firstPlace,
    secondPlace,
    thirdPlace,
    fourthPlace,
    fifthPlace,
    thirdLastPlace,
    secondToLastPlace,
    lastPlace,
  };
  return results
}
