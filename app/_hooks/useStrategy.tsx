"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";

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
