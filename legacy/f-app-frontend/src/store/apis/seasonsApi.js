import { leaguesApi } from "./leaguesApi";
import { auth } from "../../firebase/firebase";

const seasonsApi = leaguesApi.injectEndpoints({
    endpoints(builder){
        return{
            getSeasons: builder.query({
                query: () => {
                    const userId =  auth.currentUser.uid;
                    return{
                        url: `/seasons/${userId}`,
                        method: "GET",
                    }
                }
            })
        }
    }
})

export default seasonsApi;
export const {useGetSeasonsQuery} = seasonsApi