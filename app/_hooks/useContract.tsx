"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";

export const CONTRACT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment ContractInfo on Contract {
    id
    chainId
    address
    backendUrl
    description
    isTestnet
    status
  }
`);

export const GET_ALL_CONTRACT_DOCUMENT = graphql(`
  query getAllContracts {
    getAllContracts {
      ...ContractInfo
    }
  }
`);

export const GET_ALL_TRADE_PAIRS_DOCUMENT = graphql(`
  query getAllTradePairs($contractId: [Int!]!) {
    getTradePairs(contractId: $contractId) {
      contractId
      from
      pairIndex
      to
      onePercentDepthAboveUsd
      onePercentDepthBelowUsd
    }
  }
`);

export const GET_TRADE_COLLATERALS_DOCUMENT = graphql(`
  query getTradeCollaterals($contractId: Int!) {
    getTradeCollaterals(contractId: $contractId) {
      collateral
      collateralIndex
      isActive
      precision
      precisionDelta
    }
  }
`);

export function useGetAllTradePairs(contractIds?: number[]) {
  const { data } = useQuery(GET_ALL_TRADE_PAIRS_DOCUMENT, {
    variables: contractIds ? { contractId: contractIds } : undefined,
  });

  return data?.getTradePairs || [];
}

export function useGetTradeCollaterals(contractId?: number) {
  const { data } = useQuery(GET_TRADE_COLLATERALS_DOCUMENT, {
    variables: contractId ? { contractId } : undefined,
  });

  return data?.getTradeCollaterals || [];
}

export function useGetAllContracts() {
  const { data } = useQuery(GET_ALL_CONTRACT_DOCUMENT, {
    variables: {},
  });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllContracts.map((contract) => ({
      ...getFragmentData(CONTRACT_INFO_FRAGMENT_DOCUMENT, contract),
    }));
  }, [data]);
}
