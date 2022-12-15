import api from "./api";

export const removePlayer = async(id) => {
    const res = await api.delete("/players/" + id, null);

    return res;
}

export const getAllPlayers = async(id) => {
    const res = await api.get("/players/", null);

    return res;
}

export const getPlayer = async(id) => {
    const res = await api.get("/players/" + id, null);

    return res.data;
}

export const patchPlayer = async(id, playerToSave) => {
    const res = await api.patch('/players/'+id,playerToSave);

    return res.data
}

export const createPlayer = async(playerToSave) => {
    const res  = await api.post('/players',playerToSave)

    return res;
}

export const generateMultiplePlayers = async(stats) => {
    await api.post('/players/generateMultiple',stats);
}
