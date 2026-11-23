"use client";

import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSnackbar } from "notistack";

import { graphql } from "@/gql/index";
import {
  CreateRpcEndpointsInput,
  RpcEndpointState,
} from "@/graphql/gql/graphql";

export const RPC_WORKER_DASHBOARD_DOCUMENT = graphql(`
  query rpcWorkerDashboard {
    rpcWorkerDashboard {
      analyticsOnline
      paidOnly
      generatedAt
      rateGroups {
        key
        inFlight
        limit
        ratePerSecond
        cooldownUntil
        rateLimitedCount
      }
      adaptions {
        contractId
        chainId
        startedAt
        fromBlock
        endBlock
        checkpointBlock
        cursorBlock
        retryRanges
        inFlightRanges
        completedAheadRanges
        completedBlocks
        totalBlocks
      }
      workers {
        key
        endpointId
        chainId
        provider
        tier
        label
        maskedUrl
        state
        stateReason
        status
        maxBlockRange
        concurrency
        activeSlots
        penaltyLevel
        penaltyUntil
        successCount
        failureCount
        blocksProcessed
        avgLatencyMs
        lastErrorKind
        lastError
        lastErrorAt
        lastSuccessAt
        assignmentContractId
        assignmentFromBlock
        assignmentToBlock
        assignmentStartedAt
        tokenId
        tokenHint
        lastCheckedAt
        lastCheckOk
        lastCheckLatencyMs
        lastCheckErrorKind
        lastCheckError
      }
    }
  }
`);

const PAUSE_RPC_ENDPOINT_DOCUMENT = graphql(`
  mutation pauseRpcEndpoint($id: Int!) {
    pauseRpcEndpoint(id: $id)
  }
`);

const RESUME_RPC_ENDPOINT_DOCUMENT = graphql(`
  mutation resumeRpcEndpoint($id: Int!) {
    resumeRpcEndpoint(id: $id)
  }
`);

const DELETE_RPC_ENDPOINT_DOCUMENT = graphql(`
  mutation deleteRpcEndpoint($id: Int!) {
    deleteRpcEndpoint(id: $id)
  }
`);

const CREATE_RPC_ENDPOINTS_DOCUMENT = graphql(`
  mutation createRpcEndpoints($input: CreateRpcEndpointsInput!) {
    createRpcEndpoints(input: $input)
  }
`);

const UPDATE_RPC_ENDPOINT_DOCUMENT = graphql(`
  mutation updateRpcEndpoint($input: UpdateRpcEndpointInput!) {
    updateRpcEndpoint(input: $input)
  }
`);

const SET_RPC_RATE_GROUP_LIMIT_DOCUMENT = graphql(`
  mutation setRpcRateGroupLimit(
    $key: String!
    $limit: Int!
    $ratePerSecond: Float
  ) {
    setRpcRateGroupLimit(
      key: $key
      limit: $limit
      ratePerSecond: $ratePerSecond
    )
  }
`);

const CHECK_RPC_ENDPOINTS_DOCUMENT = graphql(`
  mutation checkRpcEndpoints($ids: [Int!], $tokenId: String, $chainId: Int) {
    checkRpcEndpoints(ids: $ids, tokenId: $tokenId, chainId: $chainId) {
      endpointId
      ok
    }
  }
`);

const SET_RPC_TOKEN_STATE_DOCUMENT = graphql(`
  mutation setRpcTokenState($tokenId: String!, $state: RpcEndpointState!) {
    setRpcTokenState(tokenId: $tokenId, state: $state)
  }
`);

const ADD_RPC_TOKEN_CHAINS_DOCUMENT = graphql(`
  mutation addRpcTokenChains($tokenId: String!, $chainIds: [Int!]!) {
    addRpcTokenChains(tokenId: $tokenId, chainIds: $chainIds)
  }
`);

const DELETE_RPC_TOKEN_DOCUMENT = graphql(`
  mutation deleteRpcToken($tokenId: String!) {
    deleteRpcToken(tokenId: $tokenId)
  }
`);

const SET_RPC_BACKFILL_PAID_ONLY_DOCUMENT = graphql(`
  mutation setRpcBackfillPaidOnly($enabled: Boolean!) {
    setRpcBackfillPaidOnly(enabled: $enabled)
  }
`);

const UPDATE_RPC_TOKEN_DOCUMENT = graphql(`
  mutation updateRpcToken(
    $tokenId: String!
    $maxBlockRange: Int
    $concurrency: Int
  ) {
    updateRpcToken(
      tokenId: $tokenId
      maxBlockRange: $maxBlockRange
      concurrency: $concurrency
    )
  }
`);

export function useRpcWorkerDashboard() {
  return useQuery(RPC_WORKER_DASHBOARD_DOCUMENT, {
    pollInterval: 3_000,
    fetchPolicy: "network-only",
  });
}

const refetchQueries = [RPC_WORKER_DASHBOARD_DOCUMENT];

export function useRpcEndpointActions() {
  const { enqueueSnackbar } = useSnackbar();
  const [pause, pauseState] = useMutation(PAUSE_RPC_ENDPOINT_DOCUMENT, {
    refetchQueries,
  });
  const [resume, resumeState] = useMutation(RESUME_RPC_ENDPOINT_DOCUMENT, {
    refetchQueries,
  });
  const [remove, removeState] = useMutation(DELETE_RPC_ENDPOINT_DOCUMENT, {
    refetchQueries,
  });
  const [create, createState] = useMutation(CREATE_RPC_ENDPOINTS_DOCUMENT, {
    refetchQueries,
  });
  const [update, updateState] = useMutation(UPDATE_RPC_ENDPOINT_DOCUMENT, {
    refetchQueries,
  });
  const [check, checkState] = useMutation(CHECK_RPC_ENDPOINTS_DOCUMENT, {
    refetchQueries,
  });
  const [setTokenState, setTokenStateState] = useMutation(
    SET_RPC_TOKEN_STATE_DOCUMENT,
    { refetchQueries },
  );
  const [addTokenChains, addTokenChainsState] = useMutation(
    ADD_RPC_TOKEN_CHAINS_DOCUMENT,
    { refetchQueries },
  );
  const [deleteToken, deleteTokenState] = useMutation(
    DELETE_RPC_TOKEN_DOCUMENT,
    { refetchQueries },
  );
  const [setPaidOnly, setPaidOnlyState] = useMutation(
    SET_RPC_BACKFILL_PAID_ONLY_DOCUMENT,
    { refetchQueries },
  );
  const [updateToken, updateTokenState] = useMutation(
    UPDATE_RPC_TOKEN_DOCUMENT,
    { refetchQueries },
  );
  const [setGroupLimit, setGroupLimitState] = useMutation(
    SET_RPC_RATE_GROUP_LIMIT_DOCUMENT,
    { refetchQueries },
  );

  const run = useCallback(
    async (action: () => Promise<unknown>, success: string) => {
      try {
        await action();
        enqueueSnackbar(success, { variant: "success" });
        return true;
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : String(err), {
          variant: "error",
        });
        return false;
      }
    },
    [enqueueSnackbar],
  );

  return {
    pauseEndpoint: (id: number) =>
      run(() => pause({ variables: { id } }), "Worker paused"),
    resumeEndpoint: (id: number) =>
      run(() => resume({ variables: { id } }), "Worker resumed"),
    deleteEndpoint: (id: number) =>
      run(() => remove({ variables: { id } }), "Worker deleted"),
    checkEndpoints: async (filter: {
      ids?: number[];
      tokenId?: string;
      chainId?: number;
    }) => {
      try {
        const result = await check({ variables: filter });
        const items = result.data?.checkRpcEndpoints ?? [];
        const failed = items.filter((item) => !item.ok).length;
        enqueueSnackbar(
          `Checked ${items.length} endpoint${items.length === 1 ? "" : "s"}: ${items.length - failed} ok, ${failed} failed`,
          { variant: failed ? "warning" : "success" },
        );
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : String(err), {
          variant: "error",
        });
      }
    },
    setTokenState: (tokenId: string, state: RpcEndpointState) =>
      run(
        () => setTokenState({ variables: { tokenId, state } }),
        state === RpcEndpointState.Paused ? "Token paused" : "Token resumed",
      ),
    addTokenChains: (tokenId: string, chainIds: number[]) =>
      run(
        () => addTokenChains({ variables: { tokenId, chainIds } }),
        "Chains added to token",
      ),
    deleteToken: (tokenId: string) =>
      run(() => deleteToken({ variables: { tokenId } }), "Token deleted"),
    setRateGroupLimit: (key: string, limit: number, ratePerSecond: number) =>
      run(
        () => setGroupLimit({ variables: { key, limit, ratePerSecond } }),
        `${key}: ${limit} at once, ${ratePerSecond ? `${ratePerSecond}/s` : "no rate limit"}`,
      ),
    setEndpointSettings: (
      id: number,
      settings: { maxBlockRange: number; concurrency: number },
    ) =>
      run(
        () => update({ variables: { input: { id, ...settings } } }),
        "Endpoint settings saved",
      ),
    setTokenSettings: (
      tokenId: string,
      settings: { maxBlockRange?: number; concurrency: number },
    ) =>
      run(
        () => updateToken({ variables: { tokenId, ...settings } }),
        "Token settings saved for all its chains",
      ),
    setPaidOnly: (enabled: boolean) =>
      run(
        () => setPaidOnly({ variables: { enabled } }),
        enabled
          ? "Backfill now uses Paid endpoints only"
          : "Backfill uses all active endpoints",
      ),
    createEndpoints: async (input: CreateRpcEndpointsInput) => {
      try {
        const result = await create({ variables: { input } });
        const count = result.data?.createRpcEndpoints ?? 0;
        enqueueSnackbar(
          count > 0
            ? `Added ${count} worker${count === 1 ? "" : "s"}`
            : "Nothing added: these endpoints already exist",
          { variant: count > 0 ? "success" : "warning" },
        );
        return true;
      } catch (err) {
        enqueueSnackbar(err instanceof Error ? err.message : String(err), {
          variant: "error",
        });
        return false;
      }
    },
    loading:
      pauseState.loading ||
      resumeState.loading ||
      removeState.loading ||
      createState.loading ||
      updateState.loading ||
      setGroupLimitState.loading ||
      setPaidOnlyState.loading ||
      updateTokenState.loading ||
      setTokenStateState.loading ||
      addTokenChainsState.loading ||
      deleteTokenState.loading,
    checking: checkState.loading,
  };
}
