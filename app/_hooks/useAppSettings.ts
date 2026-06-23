"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const LOCAL_APP_SETTINGS = "local-app-settings";

export const initialAppSettings = {};

export type AppSettings = {};

export function useAppSettings() {
  const queryClient = useQueryClient();

  const appQuery = useQuery({
    queryKey: [LOCAL_APP_SETTINGS],
    queryFn: async () => {
      try {
        const appSettingsStr = window.localStorage.getItem(LOCAL_APP_SETTINGS);

        if (!appSettingsStr) {
          return Promise.resolve(initialAppSettings);
        }

        const appSettings = JSON.parse(appSettingsStr) as AppSettings;

        return Promise.resolve(appSettings || initialAppSettings);
      } catch (err) {
        console.log(err);
        return Promise.reject(
          new Error("Failed at getting app settings from localstorage"),
        );
      }
    },
  });

  const changeAppSettings = useMutation({
    mutationFn: (newAppSettings: Partial<AppSettings>) => {
      try {
        window.localStorage.setItem(
          LOCAL_APP_SETTINGS,
          JSON.stringify({
            ...(appQuery.data || initialAppSettings),
            ...newAppSettings,
          }),
        );

        return Promise.resolve(newAppSettings);
      } catch (err) {
        console.log(err);
        return Promise.reject(
          new Error("Failed at saving jwt from localstorage"),
        );
      }
    },
    onSuccess: (newAppSettings: Partial<AppSettings>) => {
      if (newAppSettings) {
        queryClient.setQueriesData(
          { queryKey: [LOCAL_APP_SETTINGS] },
          (prev) => ({ ...(prev || initialAppSettings), ...newAppSettings }),
        );
      } else {
        queryClient.setQueriesData(
          { queryKey: [LOCAL_APP_SETTINGS] },
          () => initialAppSettings,
        );
      }
    },
  });

  return {
    appSettings: appQuery.data || initialAppSettings,
    changeAppSettings,
  };
}
