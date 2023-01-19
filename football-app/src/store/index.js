import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { leaguesApi } from "./apis/leaguesApi";

export const store = configureStore({
  reducer: {
    [leaguesApi.reducerPath]: leaguesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      leaguesApi.middleware,
    );
  },
});

setupListeners(store.dispatch);

export {
  useFetchPlayersQuery,
  useRemovePlayerMutation,
  useCreatePlayerMutation,
  useEditPlayerMutation,
} from "./apis/playersApi";
export {
  useFetchClubsQuery,
  useGetOneClubQuery,
  useGetClubLeagueStatsQuery,
  useCreateClubMutation,
  useEditClubMutation,
  useRemoveClubMutation,
  useFetchClubMatchesQuery,
  useFetchClubPlayersQuery,
} from "./apis/clubsApi";
export {
  useFetchLeaguesQuery,
  useGetLeagueMatchesQuery,
  useGetLeagueTablesQuery,
  useCreateLeagueMutation,
  usePatchLeagueTablesMutation,
  usePatchMatchMutation,
  useGetFriendlyMatchesQuery,
  useCreateFriendlyMatchMutation,
} from "./apis/leaguesApi";
export {
  useCreateUserMutation,
} from "./apis/usersApi"
