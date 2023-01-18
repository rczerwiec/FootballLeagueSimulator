import { leaguesApi } from './leaguesApi';

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
            })
        }
    }
})

export const {useCreateUserMutation} = usersApi;