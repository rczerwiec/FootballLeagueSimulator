import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const leaguesApi = createApi({
    reducerPath: 'leagues',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    endpoints(builder){
        return{
            fetchLeagues: builder.query({
                query: () => {
                    return{
                        url:'/leagues',
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const {useFetchLeaguesQuery} = leaguesApi;
export {leaguesApi}