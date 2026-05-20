import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getClientAuth } from "@/lib/firebase/client";
import { isAuthSkipped } from "@/lib/auth/authConfig";
import { applySkipAuthHeaders } from "@/lib/auth/skipAuthFetch";

export const leaguesApi = createApi({
  reducerPath: "leagues",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers) => {
      if (isAuthSkipped()) {
        return applySkipAuthHeaders(headers);
      }
      const token = await getClientAuth()?.currentUser?.getIdToken();
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Matches",
    "Tables",
    "Leagues",
    "ClubMatches",
    "ClubPlayers",
    "Player",
    "Club",
    "FriendlyMatches",
    "ClubLeagueStats",
    "Seasons",
  ],
  endpoints: (builder) => ({
    createLeague: builder.mutation({
      invalidatesTags: ["Leagues"],
      query: (league) => ({
        url: "/leagues",
        method: "POST",
        body: league,
      }),
    }),
    updateLeagueProgression: builder.mutation<
      unknown,
      { leagueId: string; advances?: number; relegation?: number }
    >({
      invalidatesTags: ["Leagues", "Seasons"],
      query: ({ leagueId, ...body }) => ({
        url: `/leagues/${leagueId}`,
        method: "PATCH",
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchLeagues: builder.query<any[], void>({
      providesTags: ["Leagues"],
      query: () => ({ url: "/leagues", method: "GET" }),
    }),
    getLeagueMatches: builder.query({
      providesTags: ["Matches"],
      query: (leagueId: string) => ({
        url: `/leagues/${leagueId}/matches`,
        method: "GET",
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFriendlyMatches: builder.query<any[], void>({
      providesTags: ["FriendlyMatches"],
      query: () => ({ url: "/matches/friendly", method: "GET" }),
    }),
    createFriendlyMatch: builder.mutation({
      invalidatesTags: ["FriendlyMatches", "Club", "ClubMatches"],
      query: ({ firstClub, secondClub }: { firstClub: unknown; secondClub: unknown }) => ({
        url: "/matches",
        method: "POST",
        body: { firstClub, secondClub },
      }),
    }),
    patchMatch: builder.mutation({
      invalidatesTags: ["Matches", "ClubMatches", "Club", "ClubLeagueStats"],
      query: ({ match, league }: { match: Record<string, unknown>; league: { _id: string } }) => {
        let winner: unknown;
        const m = match as { scoreAway: number; scoreHome: number; clubAway: unknown; clubHome: unknown; _id: string };
        if (m.scoreAway > m.scoreHome) winner = m.clubAway;
        else if (m.scoreAway < m.scoreHome) winner = m.clubHome;
        return {
          method: "PATCH",
          url: `/matches/${m._id}`,
          body: { match, winner, league },
        };
      },
    }),
    getLeagueTables: builder.query({
      providesTags: ["Tables"],
      query: (leagueId: string) => ({
        url: `/leagues/${leagueId}/tables`,
        method: "GET",
      }),
    }),
    patchLeagueTables: builder.mutation({
      invalidatesTags: ["Tables"],
      query: ({
        league,
        match,
        clubId,
      }: {
        league: { _id: string };
        match: unknown;
        clubId: string;
      }) => ({
        method: "PATCH",
        url: `/tables/${league._id}/${clubId}`,
        body: { match, club: clubId },
      }),
    }),
  }),
});

export const {
  useFetchLeaguesQuery,
  useGetLeagueMatchesQuery,
  useGetLeagueTablesQuery,
  useCreateLeagueMutation,
  useUpdateLeagueProgressionMutation,
  usePatchLeagueTablesMutation,
  usePatchMatchMutation,
  useGetFriendlyMatchesQuery,
  useCreateFriendlyMatchMutation,
} = leaguesApi;
