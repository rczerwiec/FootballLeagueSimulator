import api from "./api";

export const removePlayer = async(id) => {
    const res = await api.delete("/players/" + id, null);

    return res;
}

export const getPlayer = async(id) => {
    const res = await api.get("/players/" + id, null);

    return res.data;
}

export const patchPlayer = async(id, playerToSave) => {
    await api.patch('/players/'+id,playerToSave);
}

export const createPlayer = async(playerToSave) => {
    await api.post('/players',playerToSave)
}

export const generateMultiplePlayers = async(stats) => {
    await api.post('/players/generateMultiple',stats);
}
