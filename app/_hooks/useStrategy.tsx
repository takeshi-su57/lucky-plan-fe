"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";

import { getFragmentData, graphql } from "@/gql/index";
import { useSnackbar } from "notistack";

export const STRATEGY_METADATA_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment StrategyMetadataInfo on StrategyMetadata {
    key
    title
    description
  }
`);

export const STRATEGY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment StrategyInfo on Strategy {
    id
    lifeTime
    maxCollateral
    minCollateral
    maxLeverage
    minLeverage
    collateralBaseline
    params
    ratio
    strategyKey
  }
`);

export const GET_ALL_STRATEGY_METADATA_DOCUMENT = graphql(`
  query getAllStrategyMetadata {
    getAllStrategyMetadata {
      ...StrategyMetadataInfo
    }
  }
`);

export const GET_ALL_STRATEGY_DOCUMENT = graphql(`
  query getAllStrategy {
    getAllStrategy {
      ...StrategyInfo
    }
  }
`);

export const UPDATE_STRATEGY_DOCUMENT = graphql(`
  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {
    updateStrategy(id: $id, input: $input) {
      ...StrategyInfo
    }
  }
`);

export function useGetAllStrategyMetadata() {
  const { data } = useQuery(GET_ALL_STRATEGY_METADATA_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllStrategyMetadata.map((metadata) => ({
      ...getFragmentData(STRATEGY_METADATA_INFO_FRAGMENT_DOCUMENT, metadata),
    }));
  }, [data]);
}

export function useGetAllStrategy() {
  const { data } = useQuery(GET_ALL_STRATEGY_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllStrategy.map((strategy) => ({
      ...getFragmentData(STRATEGY_INFO_FRAGMENT_DOCUMENT, strategy),
    }));
  }, [data]);
}

export function useUpdateStrategy() {
  const [updateStrategy, { error, loading, data }] = useMutation(
    UPDATE_STRATEGY_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      enqueueSnackbar("Success at updating strategy!", {
        variant: "success",
      });
    }

    if (data && error) {
      enqueueSnackbar("Error at updating strategy!", {
        variant: "error",
      });
    }
  }, [data, error, enqueueSnackbar]);

  return {
    updateStrategy,
    loading,
  };
}
