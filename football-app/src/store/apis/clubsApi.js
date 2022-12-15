import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clubsApi = createApi({
    reducerPath: 'clubs',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    endpoints(builder){
        return{
            removeClub: builder.mutation({
                invalidatesTags: (result,error,args) => {
                    //console.log(args);
                    return [{type: 'Club', id: args}]
                },
                query: (clubId) => {
                    return{
                        url: `/clubs/${clubId}`,
                        method: 'DELETE',
                    }
                }
            }),
            editClub: builder.mutation({
                invalidatesTags: (result,error,args) => {
                    return [{type: 'Club', id: args.id}]
                },
                query: ({clubId, club}) => {
                    return{
                        url: `/clubs/${clubId}`,
                        method: 'PATCH',
                        body: club,
                    }
                }
            }),
            fetchClubs: builder.query({
                providesTags: (result,error,args) => {
                    const tags = result.map((club)=>{
                        return {type: 'Club', id:club._id}
                    });
                    //console.log(tags);
                    return tags;
                },
                query: () => {
                    return{
                        url: '/clubs',
                        params:{},
                        method: 'GET'
                    }
                }

            }),
            getOneClub: builder.query({
                query: (id) => {
                    const clubId = id;
                    //console.log()
                    return{
                        url: `/clubs/${clubId}`,
                        method: 'GET',
                    }
                }
            }),
            createClub: builder.mutation({
                invalidatesTags: (result,error,args) => {
                    return [{type: 'Club', id: args.id}]
                },
                query: (club) => {
                    return{
                        url: '/clubs',
                        method: 'POST',
                        body: club,
                    }
                }
            })
        }
    }
})

export const {useFetchClubsQuery, useGetOneClubQuery, useCreateClubMutation, useEditClubMutation, useRemoveClubMutation} = clubsApi;
export {clubsApi}