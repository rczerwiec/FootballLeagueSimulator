import { leaguesApi } from "./leaguesApi";
import { getActingFirebaseUid } from "@/lib/auth/clientAuth";
import type { UserData } from "@/types/user";

const usersApi = leaguesApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user, type }: { user: unknown; type: string }) => ({
        url: "/user/",
        body: { user, type },
        method: "POST",
      }),
    }),
    getUser: builder.query<UserData, void>({
      query: () => {
        const userId = getActingFirebaseUid();
        return { url: `/user/${userId}`, method: "GET" };
      },
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = usersApi;
