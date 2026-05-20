import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { leaguesApi } from "./apis/leaguesApi";
import "./apis/clubsApi";
import "./apis/playersApi";
import "./apis/usersApi";
import "./apis/seasonsApi";

export const store = configureStore({
  reducer: {
    [leaguesApi.reducerPath]: leaguesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(leaguesApi.middleware),
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
  useUpdateLeagueProgressionMutation,
  usePatchLeagueTablesMutation,
  usePatchMatchMutation,
  useGetFriendlyMatchesQuery,
  useCreateFriendlyMatchMutation,
} from "./apis/leaguesApi";
export { useCreateUserMutation, useGetUserQuery } from "./apis/usersApi";
export {
  useGetSeasonsQuery,
  useCreateSeasonMutation,
  useStartNextSeasonMutation,
} from "./apis/seasonsApi";
export type { SeasonData, SeasonLeague } from "./apis/seasonsApi";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
