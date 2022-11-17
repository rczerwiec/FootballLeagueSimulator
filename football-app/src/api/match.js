import api from "./api";

export const getFriendlyMatches = async() => {
    const res = await api.get("/matches/friendly");

    return res.data;
}