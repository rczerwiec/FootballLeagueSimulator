import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const leaguesApi = createApi({
    reducerPath: 'leagues',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['Matches', 'Tables', 'Leagues'],
    endpoints(builder){
        return{
            createLeague: builder.mutation({
                invalidatesTags: ['Leagues'],
                query: (league) =>{
                    return{
                        url:'/leagues',
                        method: 'POST',
                        body:league
                    }
                }
            }),
            fetchLeagues: builder.query({
                providesTags: ['Leagues'],
                query: () => {
                    return{
                        url:'/leagues',
                        method: 'GET'
                    }
                }
            }),
            getLeagueMatches: builder.query({
                providesTags: ['Matches'],
                query: (leagueId) => {
                    return{
                        url:`/leagues/${leagueId}/matches`,
                        method: 'GET'
                    }
                }
            }),
            patchMatch: builder.mutation({
                invalidatesTags: ['Matches'],
                query: (match) => {
                    const matchId = match._id;
                    console.log(match);
                    return {
                        method: 'PATCH',
                        url: `/matches/${matchId}`,
                        body: match
                    }
                }
            }),
            getLeagueTables: builder.query({
                providesTags: ['Tables'],
                query: (leagueId) => {
                    return{
                        url:`/leagues/${leagueId}/tables`,
                        method: 'GET'
                    }
                }
            }),
            patchLeagueTables: builder.mutation({
                invalidatesTags: ['Tables'],
                query: ({league,match,clubId}) => {
                    const leagueId = league._id;
                    return{
                        method:'PATCH',
                        url:`/tables/${leagueId}/${clubId}`,
                        body: {
                            match:match,
                            club: clubId
                        }
                    }
                }
            }),

        }
    }
})

export const {useFetchLeaguesQuery, useGetLeagueMatchesQuery, useGetLeagueTablesQuery, useCreateLeagueMutation, usePatchLeagueTablesMutation, usePatchMatchMutation} = leaguesApi;
export {leaguesApi}