import { leaguesApi } from "./leaguesApi";

const clubsApi = leaguesApi.injectEndpoints({
  endpoints(builder) {
    return {
      removeClub: builder.mutation({
        invalidatesTags: (result, error, args) => {
          //console.log(args);
          return [{ type: "Club", id: args }];
        },
        query: (clubId) => {
          return {
            url: `/clubs/${clubId}`,
            method: "DELETE",
          };
        },
      }),
      editClub: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Club", id: args.id }];
        },
        query: ({ clubId, club }) => {
          return {
            url: `/clubs/${clubId}`,
            method: "PATCH",
            body: club,
          };
        },
      }),
      fetchClubs: builder.query({
        providesTags: (result, error, args) => {
          const tags = result.map((club) => {
            return { type: "Club", id: club._id };
          });
          //console.log(tags);
          return tags;
        },
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
      createClub: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Club", id: args.id }];
        },
        query: (club) => {
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
  useCreateClubMutation,
  useEditClubMutation,
  useRemoveClubMutation,
  useFetchClubMatchesQuery,
  useFetchClubPlayersQuery,
} = clubsApi;
export { clubsApi };
