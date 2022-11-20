import api from "./api";

export const getAllClubs = async()=> {
    const res = await api.get('/clubs');

    return res.data;
}

export const getOneClub = async(id) => {
    const res = await api.get('/clubs/'+id);

    return res.data;
}

export const deleteClub = async(id) => {
    const res = await api.delete("/clubs/" + id, null);

    return res.data;
}

export const getClubPlayers = async(id) => {
    const res = await api.get("/clubs/" + id + "/players").catch(err => console.log(err));

    return res.data;
}

export const getClubMatches = async(id) => {
    const res = await api.get("/clubs/" + id + "/matches").catch(err => console.log(err));

    return res.data.matches;
}

export const patchClub = async(id, patchedObject) => {
    await api.patch('clubs/'+id,patchedObject);
}

export const createClub = async(createdObject) => {
    const res = await api.post('/clubs',createdObject);

    return res;
}