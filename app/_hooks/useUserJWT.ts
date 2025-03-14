"use client";

import { useCallback, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useMutation as useApolloMutation } from "@apollo/client";
import { useDisconnect } from "wagmi";
import { GET_TOKEN_DOCUMENT } from "./useUser";
import { UserPermission } from "@/graphql/gql/graphql";

function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const LOCAL_USER_JWT_KEY = "user-jwt";

export type UserJWT = {
  accessToken: string;
  permission: UserPermission;
  address: string;
  expirationTime: number;
};

export function useUserJWT() {
  const { disconnect } = useDisconnect();

  const queryClient = useQueryClient();
  const userJwtQuery = useQuery({
    queryKey: [LOCAL_USER_JWT_KEY],
    queryFn: async () => {
      try {
        const jwtStr = window.localStorage.getItem(LOCAL_USER_JWT_KEY);

        if (!jwtStr) {
          return Promise.resolve(null);
        }

        const parsedJwtObj = parseJwt(jwtStr);

        return Promise.resolve({
          accessToken: jwtStr,
          address: parsedJwtObj.address,
          expirationTime: parsedJwtObj.exp * 1000,
          permission: parsedJwtObj.permission,
        });
      } catch (err) {
        console.log(err);
        return Promise.reject(
          new Error("Failed at getting jwt from localstorage"),
        );
      }
    },
  });

  const changeJWTMutation = useMutation({
    mutationFn: (newJWT: string | null) => {
      try {
        window.localStorage.setItem(LOCAL_USER_JWT_KEY, JSON.stringify(newJWT));

        return Promise.resolve(newJWT);
      } catch (err) {
        console.log(err);
        return Promise.reject(
          new Error("Failed at saving jwt from localstorage"),
        );
      }
    },
    onSuccess: (newJWT: string | null) => {
      if (newJWT) {
        const parsedJwtObj = parseJwt(newJWT);

        queryClient.setQueriesData({ queryKey: [LOCAL_USER_JWT_KEY] }, () => ({
          accessToken: newJWT,
          address: parsedJwtObj.address,
          expirationTime: parsedJwtObj.exp * 1000,
          permission: parsedJwtObj.permission,
        }));
      } else {
        queryClient.setQueriesData(
          { queryKey: [LOCAL_USER_JWT_KEY] },
          () => null,
        );
      }
    },
  });

  const [signinMutation] = useApolloMutation(GET_TOKEN_DOCUMENT, {
    onCompleted: (data) => {
      changeJWTMutation.mutate(data.getToken.accessToken);
    },
  });

  const signout = useCallback(() => {
    changeJWTMutation.mutate(null);
  }, [changeJWTMutation]);

  useEffect(() => {
    if (userJwtQuery.data) {
      if (new Date(userJwtQuery.data.expirationTime) < new Date()) {
        signout();
        disconnect();
      }
    }
  }, [userJwtQuery.data, signout, disconnect]);

  return {
    userJwtQuery,
    signin: signinMutation,
    signout,
  };
}
