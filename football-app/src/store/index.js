import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { playersApi } from "./apis/playersApi";

export const store = configureStore({
    reducer: {
        [playersApi.reducerPath]: playersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(playersApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchPlayersQuery, useRemovePlayerMutation,useCreatePlayerMutation, useEditPlayerMutation} from './apis/playersApi';
