import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { clubsApi } from "./apis/clubsApi";
import { playersApi } from "./apis/playersApi";

export const store = configureStore({
    reducer: {
        [playersApi.reducerPath]: playersApi.reducer,
        [clubsApi.reducerPath]: clubsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(playersApi.middleware, clubsApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchPlayersQuery, useRemovePlayerMutation,useCreatePlayerMutation, useEditPlayerMutation} from './apis/playersApi';
export {useFetchClubsQuery} from './apis/clubsApi';
