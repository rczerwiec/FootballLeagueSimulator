import { leaguesApi } from './leaguesApi';

const playersApi = leaguesApi.injectEndpoints({
    endpoints(builder){
        return{
            editPlayer: builder.mutation({
                invalidatesTags: (result, error, {id, player}) =>{
                    return [{type: 'Player', id: id}]
                },
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
                invalidatesTags: (result, error, player) =>{
                    return [{type: 'Player', id: player._id},"ClubPlayers"]
                },
                query: (player) => {
                    return{
                        url: '/players',
                        body: player,
                        method: 'POST'
                    }
                }
            }),
            removePlayer: builder.mutation({
                invalidatesTags: (result, error, player) =>{
                    return [{type: 'Player', id: player._id}]
                },
                query: (player) => {
                    const playerId = player._id
                    return{
                        url: `/players/${playerId}`,
                        method: 'DELETE'
                    }
                }
            }),
            fetchPlayers: builder.query({
                providesTags: (result,error, arg) => {
                    const tags = result.map(player => {
                        return {type: 'Player', id: player._id}
                    })
                    console.log(tags);
                    return tags;
                },
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