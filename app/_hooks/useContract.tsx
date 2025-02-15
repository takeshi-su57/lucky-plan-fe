"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";

export const CONTRACT_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment ContractInfo on Contract {
    id
    chainId
    address
    backendUrl
    description
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
  query getAllTradePairs($contractId: Int!) {
    getTradePairs(contractId: $contractId) {
      from
      pairIndex
      to
    }
  }
`);

export const CREATE_CONTRACT_DOCUMENT = graphql(`
  mutation createContract($input: CreateContractInput!) {
    createContract(input: $input) {
      ...ContractInfo
    }
  }
`);

export const CHANGE_CONTRACT_STATUS_DOCUMENT = graphql(`
  mutation changeContractStatus($input: ChangeContractStatusInput!) {
    changeContractStatus(input: $input) {
      ...ContractInfo
    }
  }
`);

export function useGetAllTradePairs(contractId?: number) {
  const { data } = useQuery(GET_ALL_TRADE_PAIRS_DOCUMENT, {
    variables: contractId ? { contractId } : undefined,
  });

  return data?.getTradePairs || [];
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

export function useCreateContract() {
  const [createContract, { data: newData, error }] = useMutation(
    CREATE_CONTRACT_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const contractInfo = getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        newData.createContract,
      );

      enqueueSnackbar("Success at creating new contract!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_CONTRACT_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllContracts.length > 0) {
            const alreadyExists = data.getAllContracts.filter(
              (contract) =>
                contractInfo.id ===
                getFragmentData(CONTRACT_INFO_FRAGMENT_DOCUMENT, contract).id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllContracts: [...data.getAllContracts, contractInfo],
            };
          } else {
            return {
              getAllContracts: [contractInfo],
            };
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return createContract;
}

export function useChangeContractStatus() {
  const [changeContractStatus, { data: updatedData, error }] = useMutation(
    CHANGE_CONTRACT_STATUS_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedData && !error) {
      const contractInfo = getFragmentData(
        CONTRACT_INFO_FRAGMENT_DOCUMENT,
        updatedData.changeContractStatus,
      );

      enqueueSnackbar("Success at changing contract!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: contractInfo.__typename,
          id: contractInfo.id,
        }),
        fragment: CONTRACT_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "ContractInfo",
        data: contractInfo,
      });
    }
  }, [client.cache, error, enqueueSnackbar, updatedData]);

  return changeContractStatus;
}
