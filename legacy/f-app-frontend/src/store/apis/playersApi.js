import { leaguesApi } from './leaguesApi';

const playersApi = leaguesApi.injectEndpoints({
    endpoints(builder){
        return{
            editPlayer: builder.mutation({
                invalidatesTags: ["Player", "ClubPlayers"],
                query: ({id,player}) => {
                    const playerId = id;
                    console.log("data",player);
                    return{
                        url: `/players/${playerId}`,
                        body: player,
                        method: 'PATCH'
                    }
                }
            }),
            createPlayer: builder.mutation({
                invalidatesTags: ["Player", "ClubPlayers"],
                query: (player) => {
                    return{
                        url: '/players',
                        body: player,
                        method: 'POST'
                    }
                }
            }),
            removePlayer: builder.mutation({
                invalidatesTags: ["Player", "ClubPlayers"],
                query: (player) => {
                    const playerId = player._id
                    return{
                        url: `/players/${playerId}`,
                        method: 'DELETE'
                    }
                }
            }),
            fetchPlayers: builder.query({
                providesTags: ["Player"],
                query: () => {
                    return{
                        url: '/players',
                        params: {},
                        method: 'GET',
                    }
                }
            })
        }
    }
})

export const {useFetchPlayersQuery, useRemovePlayerMutation, useCreatePlayerMutation, useEditPlayerMutation} = playersApi; 