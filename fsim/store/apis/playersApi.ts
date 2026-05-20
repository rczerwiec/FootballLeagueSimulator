import { leaguesApi } from "./leaguesApi";

const playersApi = leaguesApi.injectEndpoints({
  endpoints: (builder) => ({
    editPlayer: builder.mutation({
      invalidatesTags: ["Player", "ClubPlayers"],
      query: ({ id, player }: { id: string; player: unknown }) => ({
        url: `/players/${id}`,
        body: player,
        method: "PATCH",
      }),
    }),
    createPlayer: builder.mutation({
      invalidatesTags: ["Player", "ClubPlayers"],
      query: (player: unknown) => ({
        url: "/players",
        body: player,
        method: "POST",
      }),
    }),
    removePlayer: builder.mutation({
      invalidatesTags: ["Player", "ClubPlayers"],
      query: (player: { _id: string }) => ({
        url: `/players/${player._id}`,
        method: "DELETE",
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchPlayers: builder.query<any[], void>({
      providesTags: ["Player"],
      query: () => ({ url: "/players", method: "GET" }),
    }),
  }),
});

export const {
  useFetchPlayersQuery,
  useRemovePlayerMutation,
  useCreatePlayerMutation,
  useEditPlayerMutation,
} = playersApi;
