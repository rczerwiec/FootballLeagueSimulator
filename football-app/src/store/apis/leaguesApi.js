import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebase/firebase";

const leaguesApi = createApi({
  reducerPath: "leagues",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: async(headers) => {
      const token = await auth.currentUser.getIdToken()
      console.log("tuu");
      console.log(token)
      if (token) {
        headers.set('authorization',  token)
      }         
      return headers
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
  ],
  endpoints(builder) {
    return {
      createLeague: builder.mutation({
        invalidatesTags: ["Leagues"],
        query: (league) => {
          return {
            url: "/leagues",
            method: "POST",
            body: league,
          };
        },
      }),
      fetchLeagues: builder.query({
        providesTags: ["Leagues"],
        query: () => {
          return {
            url: "/leagues",
            method: "GET",
          };
        },
      }),
      getLeagueMatches: builder.query({
        providesTags: ["Matches"],
        query: (leagueId) => {
          return {
            url: `/leagues/${leagueId}/matches`,
            method: "GET",
          };
        },
      }),
      getFriendlyMatches: builder.query({
        providesTags: ["FriendlyMatches"],
        query: () => {
          return {
            url: `/matches/friendly`,
            method: "GET",
          };
        },
      }),
      createFriendlyMatch: builder.mutation({
        invalidatesTags: ["FriendlyMatches","Club", "ClubMatches"],
        query: ({firstClub, secondClub}) => {
          return {
            url: `/matches`,
            method: "POST",
            body: { firstClub, secondClub },
          };
        },
      }),
      patchMatch: builder.mutation({
        invalidatesTags: ["Matches", "ClubMatches", "Club", "ClubLeagueStats"],
        query: ({match, league}) => {
          let winner;
          if(match.scoreAway>match.scoreHome){
            winner = match.clubAway;
          }
          else if(match.scoreAway<match.scoreHome){
            winner =  match.clubHome;
          } 

          const matchId = match._id;
          return {
            method: "PATCH",
            url: `/matches/${matchId}`,
            body: {match,winner,league}
          };
        },
      }),
      getLeagueTables: builder.query({
        providesTags: ["Tables"],
        query: (leagueId) => {
          return {
            url: `/leagues/${leagueId}/tables`,
            method: "GET",
          };
        },
      }),
      patchLeagueTables: builder.mutation({
        invalidatesTags: ["Tables"],
        query: ({ league, match, clubId }) => {
          const leagueId = league._id;
          return {
            method: "PATCH",
            url: `/tables/${leagueId}/${clubId}`,
            body: {
              match: match,
              club: clubId,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchLeaguesQuery,
  useGetLeagueMatchesQuery,
  useGetLeagueTablesQuery,
  useCreateLeagueMutation,
  usePatchLeagueTablesMutation,
  usePatchMatchMutation,
  useGetFriendlyMatchesQuery,
  useCreateFriendlyMatchMutation,
} = leaguesApi;
export { leaguesApi };
