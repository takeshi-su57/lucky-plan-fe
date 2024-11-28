"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
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
    maxGas
    maxLeverage
    minCollateral
    minGas
    minLeverage
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

export const CREATE_STRATEGY_DOCUMENT = graphql(`
  mutation createStrategy($input: CreateStrategyInput!) {
    createStrategy(input: $input) {
      ...StrategyInfo
    }
  }
`);

export const REMOVE_STRATEGY_DOCUMENT = graphql(`
  mutation removeStrategy($id: Int!) {
    removeStrategy(id: $id) {
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

export function useAddNewStrategy() {
  const [createStrategy, { data: newData, error }] = useMutation(
    CREATE_STRATEGY_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const strategyInfo = getFragmentData(
        STRATEGY_INFO_FRAGMENT_DOCUMENT,
        newData.createStrategy,
      );

      enqueueSnackbar("Success at creating new strategy!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_STRATEGY_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllStrategy.length > 0) {
            const alreadyExists = data.getAllStrategy.filter(
              (strategy) =>
                strategyInfo.id ===
                getFragmentData(STRATEGY_INFO_FRAGMENT_DOCUMENT, strategy).id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllStrategy: [...data.getAllStrategy, strategyInfo],
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return createStrategy;
}

export function useRemoveStrategy() {
  const [removeStrategy, { data: deletedData, error }] = useMutation(
    REMOVE_STRATEGY_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (deletedData && !error) {
      const strategyInfo = getFragmentData(
        STRATEGY_INFO_FRAGMENT_DOCUMENT,
        deletedData.removeStrategy,
      );

      enqueueSnackbar("Success at removing strategy!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_STRATEGY_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllStrategy.length > 0) {
            return {
              ...data,
              getAllStrategy: data.getAllStrategy.filter(
                (strategy) =>
                  strategyInfo.id !==
                  getFragmentData(STRATEGY_INFO_FRAGMENT_DOCUMENT, strategy).id,
              ),
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [client.cache, error, enqueueSnackbar, deletedData]);

  return removeStrategy;
}
