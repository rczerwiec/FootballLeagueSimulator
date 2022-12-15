import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clubsApi = createApi({
    reducerPath: 'clubs',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    endpoints(builder){
        return{
            fetchClubs: builder.query({
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
                    console.log()
                    return{
                        url: `/clubs/${clubId}`,
                        method: 'GET',
                    }
                }
            })
        }
    }
})

export const {useFetchClubsQuery, useGetOneClubQuery} = clubsApi;
export {clubsApi}