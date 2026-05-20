import { leaguesApi } from "./leaguesApi";

export interface SeasonLeague {
  _id: string;
  name: string;
  level: string;
  tier: number;
  complete: boolean;
  advances: number;
  relegation: number;
}

export interface SeasonData {
  _id: string;
  name: string;
  number: number;
  complete: boolean;
  championClubId: string | null;
  previousSeasonId: string | null;
  leagues: SeasonLeague[];
}

const seasonsApi = leaguesApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeasons: builder.query<SeasonData[], void>({
      providesTags: ["Seasons"],
      query: () => ({ url: "/seasons", method: "GET" }),
    }),
    createSeason: builder.mutation<
      SeasonData,
      { name: string; leagueIds: string[] }
    >({
      invalidatesTags: ["Seasons", "Leagues"],
      query: (body) => ({
        url: "/seasons",
        method: "POST",
        body,
      }),
    }),
    startNextSeason: builder.mutation<
      SeasonData,
      { seasonId: string; name?: string }
    >({
      invalidatesTags: ["Seasons", "Leagues", "Matches", "Tables"],
      query: ({ seasonId, name }) => ({
        url: `/seasons/${seasonId}/start-next`,
        method: "POST",
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetSeasonsQuery,
  useCreateSeasonMutation,
  useStartNextSeasonMutation,
} = seasonsApi;
