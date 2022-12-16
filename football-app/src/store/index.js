import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { clubsApi } from "./apis/clubsApi";
import { playersApi } from "./apis/playersApi";
import { leaguesApi } from "./apis/leaguesApi";

export const store = configureStore({
    reducer: {
        [playersApi.reducerPath]: playersApi.reducer,
        [clubsApi.reducerPath]: clubsApi.reducer,
        [leaguesApi.reducerPath]: leaguesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(playersApi.middleware, clubsApi.middleware, leaguesApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchPlayersQuery, useRemovePlayerMutation,useCreatePlayerMutation, useEditPlayerMutation} from './apis/playersApi';
export {useFetchClubsQuery,useGetOneClubQuery,useCreateClubMutation,useEditClubMutation, useRemoveClubMutation} from './apis/clubsApi';
export {useFetchLeaguesQuery} from './apis/leaguesApi';