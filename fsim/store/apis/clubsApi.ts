import { leaguesApi } from "./leaguesApi";

const clubsApi = leaguesApi.injectEndpoints({
  endpoints: (builder) => ({
    removeClub: builder.mutation({
      invalidatesTags: ["Club"],
      query: (clubId: string) => ({
        url: `/clubs/${clubId}`,
        method: "DELETE",
      }),
    }),
    editClub: builder.mutation({
      invalidatesTags: ["Club"],
      query: ({ clubId, club }: { clubId: string; club: unknown }) => ({
        url: `/clubs/${clubId}`,
        method: "PATCH",
        body: club,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchClubs: builder.query<any[], void>({
      providesTags: ["Club"],
      query: () => ({ url: "/clubs", method: "GET" }),
    }),
    fetchClubMatches: builder.query({
      providesTags: ["ClubMatches"],
      query: (clubId: string) => ({
        url: `/clubs/${clubId}/matches`,
        method: "GET",
      }),
    }),
    fetchClubPlayers: builder.query({
      providesTags: ["ClubPlayers"],
      query: (clubId: string) => ({
        url: `/clubs/${clubId}/players`,
        method: "GET",
      }),
    }),
    getOneClub: builder.query({
      query: (id: string) => ({ url: `/clubs/${id}`, method: "GET" }),
    }),
    getClubLeagueStats: builder.query({
      providesTags: ["ClubLeagueStats"],
      query: (id: string) => ({
        url: `/tables/club/${id}`,
        method: "GET",
      }),
    }),
    createClub: builder.mutation({
      invalidatesTags: ["Club", "Player"],
      query: (club: unknown) => ({
        url: "/clubs",
        method: "POST",
        body: club,
      }),
    }),
  }),
});

export const {
  useFetchClubsQuery,
  useGetOneClubQuery,
  useGetClubLeagueStatsQuery,
  useCreateClubMutation,
  useEditClubMutation,
  useRemoveClubMutation,
  useFetchClubMatchesQuery,
  useFetchClubPlayersQuery,
} = clubsApi;
