import api from "./api";

export const createLeague = async(leaguetoCreate)=> {
    await api.post('/leagues',leaguetoCreate);
}

export const generateNewLeague = async(id,newLeague) => {
    await api.patch("/leagues/"+id, newLeague);
}

export const getAllLeagues = async() => {
    const res = await api.get("/leagues");

    return res.data;
}

export const updateMatch = async(id,match) => {
    await api.patch("/matches/"+id, match).catch(
        (err) => {
            console.log(err);
        }
    )
}

export const updateTable = async(id,clubId, match) => {
    await api.patch("/tables/"+id+"/"+clubId, match).catch(
        (err) => {
            console.log(err);
        }
    )
}

export const getLeagueMatches = async(id) => {
    const res = await api.get("/leagues/"+id+"/matches");

    return res.data
}

export const getLeagueTable = async(id) => {
    const res = await api.get("/leagues/"+id+"/tables");

    return res.data;
}