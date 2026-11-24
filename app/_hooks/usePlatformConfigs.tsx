"use client";

import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSnackbar } from "notistack";

import { graphql } from "@/gql/index";
import { Platform } from "@/graphql/gql/graphql";

export const PLATFORM_CONFIG_DASHBOARD_DOCUMENT = graphql(`
  query platformConfigDashboard {
    platformConfigDashboard {
      generatedAt
      chains {
        platform
        chainId
        network
        itemLabel
        snapshotCount
        effectiveCount
        secondaryLabel
        secondarySnapshotCount
        secondaryEffectiveCount
        lastCheck {
          platform
          chainId
          network
          mode
          sourceCount
          effectiveCount
          missing
          changed
          applied
          error
          finishedAt
        }
        lastSync {
          platform
          chainId
          network
          mode
          sourceCount
          effectiveCount
          missing
          changed
          applied
          error
          finishedAt
        }
      }
    }
  }
`);

const PLATFORM_CONFIG_ITEMS_DOCUMENT = graphql(`
  query platformConfigItems($platform: Platform!, $chainId: Int!) {
    platformConfigItems(platform: $platform, chainId: $chainId) {
      kind
      key
      name
      detail
      synced
    }
  }
`);

const CHECK_PLATFORM_CONFIGS_DOCUMENT = graphql(`
  mutation checkPlatformConfigs($platform: Platform!, $chainId: Int) {
    checkPlatformConfigs(platform: $platform, chainId: $chainId) {
      chainId
      network
      missing
      changed
      error
    }
  }
`);

const SYNC_PLATFORM_CONFIGS_DOCUMENT = graphql(`
  mutation syncPlatformConfigs($platform: Platform!, $chainId: Int) {
    syncPlatformConfigs(platform: $platform, chainId: $chainId) {
      chainId
      network
      applied
      error
    }
  }
`);

export function usePlatformConfigDashboard() {
  return useQuery(PLATFORM_CONFIG_DASHBOARD_DOCUMENT, {
    pollInterval: 30_000,
    fetchPolicy: "network-only",
  });
}

export function usePlatformConfigItems(
  platform: Platform | null,
  chainId: number | null,
) {
  return useQuery(PLATFORM_CONFIG_ITEMS_DOCUMENT, {
    variables: { platform: platform ?? Platform.Gns, chainId: chainId ?? 0 },
    skip: platform === null || chainId === null,
    fetchPolicy: "network-only",
  });
}

const refetchQueries = [PLATFORM_CONFIG_DASHBOARD_DOCUMENT];

export function usePlatformConfigActions() {
  const { enqueueSnackbar } = useSnackbar();
  const [check, checkState] = useMutation(CHECK_PLATFORM_CONFIGS_DOCUMENT, {
    refetchQueries,
  });
  const [sync, syncState] = useMutation(SYNC_PLATFORM_CONFIGS_DOCUMENT, {
    refetchQueries,
  });

  const fail = useCallback(
    (err: unknown) =>
      enqueueSnackbar(err instanceof Error ? err.message : String(err), {
        variant: "error",
      }),
    [enqueueSnackbar],
  );

  return {
    check: async (platform: Platform, chainId?: number) => {
      try {
        const result = await check({ variables: { platform, chainId } });
        const reports = result.data?.checkPlatformConfigs ?? [];
        const failed = reports.filter((report) => report.error);
        const drift = reports.filter(
          (report) =>
            !report.error && report.missing.length + report.changed.length > 0,
        );
        enqueueSnackbar(
          failed.length
            ? `Check failed on ${failed.map((r) => r.network).join(", ")}`
            : drift.length
              ? `Out of date: ${drift
                  .map(
                    (r) =>
                      `${r.network} (${r.missing.length} missing, ${r.changed.length} changed)`,
                  )
                  .join(", ")}`
              : `${platform}: everything matches the source`,
          {
            variant: failed.length
              ? "error"
              : drift.length
                ? "warning"
                : "success",
          },
        );
      } catch (err) {
        fail(err);
      }
    },
    sync: async (platform: Platform, chainId?: number) => {
      try {
        const result = await sync({ variables: { platform, chainId } });
        const reports = result.data?.syncPlatformConfigs ?? [];
        const failed = reports.filter((report) => report.error);
        const applied = reports.reduce(
          (sum, report) => sum + report.applied.length,
          0,
        );
        enqueueSnackbar(
          failed.length
            ? `Sync failed on ${failed.map((r) => r.network).join(", ")}`
            : applied
              ? `Synced ${applied} change${applied === 1 ? "" : "s"}. Other services apply it within 5 minutes.`
              : `${platform}: already up to date`,
          { variant: failed.length ? "error" : "success" },
        );
      } catch (err) {
        fail(err);
      }
    },
    checking: checkState.loading,
    syncing: syncState.loading,
  };
}
