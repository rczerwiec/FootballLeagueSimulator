import { leaguesApi } from "./leaguesApi";
import { auth } from "../../firebase/firebase";

const clubsApi = leaguesApi.injectEndpoints({
  endpoints(builder) {
    return {
      removeClub: builder.mutation({
        invalidatesTags:['Club'],
        query: (clubId) => {
          return {
            url: `/clubs/${clubId}`,
            method: "DELETE",
          };
        },
      }),
      editClub: builder.mutation({
        invalidatesTags:['Club'],
        query: ({ clubId, club }) => {
          return {
            url: `/clubs/${clubId}`,
            method: "PATCH",
            body: club,
          };
        },
      }),
      fetchClubs: builder.query({
        providesTags:['Club'],
        query: () => {
          return {
            url: "/clubs",
            params: {},
            method: "GET",
          };
        },
      }),
      fetchClubMatches: builder.query({
        providesTags: ['ClubMatches'],
        query: (clubId) => {
          console.log(clubId);
          return {
            url: `/clubs/${clubId}/matches`,
            params: {},
            method: "GET",
          };
        },
      }),
      fetchClubPlayers: builder.query({
        providesTags: ["ClubPlayers"],
        query: (clubId) => {
          return {
            url: `/clubs/${clubId}/players`,
            params: {},
            method: "GET",
          };
        },
      }),
      getOneClub: builder.query({
        query: (id) => {
          const clubId = id;
          //console.log()
          return {
            url: `/clubs/${clubId}`,
            method: "GET",
          };
        },
      }),
      getClubLeagueStats: builder.query({
        providesTags: ["ClubLeagueStats"],
        query: (id) => {
          const clubId = id;

          return{
            url: `/tables/club/${clubId}`,
            method: "GET",
          }
        }
      }),
      createClub: builder.mutation({
        invalidatesTags:['Club', 'Player'],
        query: (club) => {
          console.log(club);
          return {
            url: "/clubs",
            method: "POST",
            body: club,
          };
        },
      }),
    };
  },
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
export { clubsApi };
