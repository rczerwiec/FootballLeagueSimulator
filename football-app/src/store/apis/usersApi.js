import { leaguesApi } from './leaguesApi';
import { auth } from "../../firebase/firebase";

const usersApi = leaguesApi.injectEndpoints({
    endpoints(builder){
        return{
            createUser: builder.mutation({
                query: ({user,type}) => {
                    console.log(user, type)
                    return{
                        url: `/user/`,
                        body: {user,type},
                        method: 'POST'
                    }
                }
            }),
            getUser: builder.query({
                query: () => {
                    const userId =  auth.currentUser.uid;
                    console.log("token",userId)
                    return{
                        url: `/user/${userId}`,
                        method: `GET`,
                    }
                }
            })
        }
    }
})

export const {useCreateUserMutation, useGetUserQuery} = usersApi;