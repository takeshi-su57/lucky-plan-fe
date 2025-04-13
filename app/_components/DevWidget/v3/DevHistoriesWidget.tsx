import { useEffect, useState } from "react";

import { PersonalTradeHistory } from "@/types";
import { useGetAllContracts } from "@/app/_hooks/useContract";
// import { getPersonalTradeHistories } from "@/app/_actions/getPersonalTradeHistories";
import { useApolloClient } from "@apollo/client";
import { GET_ALL_TRADEHISTORIES_DOCUMENT } from "@/app/_hooks/useHistory";
import { HistoriesWidget } from "../../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";
import { Address } from "viem";

export function DevHistoriesWidget({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const allContracts = useGetAllContracts();
  const apolloClient = useApolloClient();

  const [appUserHistories, setAppUserHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  // const [originalUserHistories, setOriginalUserHistories] = useState<
  //   Record<string, PersonalTradeHistory[]>
  // >({});

  useEffect(() => {
    if (allContracts.length > 0) {
      allContracts.forEach((contract) => {
        if (contract.isTestnet || !contract.backendUrl) {
          return null;
        }

        // getPersonalTradeHistories(contract.backendUrl, walletAddress).then(
        //   (histories) => {
        //     setAppUserHistories((prev) => ({
        //       ...prev,
        //       [contract.id]: histories,
        //     }));
        //   },
        // );

        apolloClient
          .query({
            variables: {
              address: walletAddress,
              contractId: contract.id,
            },
            query: GET_ALL_TRADEHISTORIES_DOCUMENT,
          })
          .then(({ data }) => {
            setAppUserHistories((prev) => ({
              ...prev,
              [contract.id]: data.getTradeHistories,
            }));
          });
      });
    }
  }, [allContracts, apolloClient, walletAddress]);

  return (
    <div>
      {allContracts
        .filter(
          (contract) =>
            !contract.isTestnet &&
            appUserHistories[contract.id] &&
            appUserHistories[contract.id].length > 0,
          // originalUserHistories[contract.id] &&
          // originalUserHistories[contract.id].length > 0,
        )
        .map((contract) => (
          <div key={contract.id}>
            <div>Contract: {contract.id}</div>
            <div className="flex flex-col gap-4">
              <span>
                App Histories: {appUserHistories[contract.id]?.length}
              </span>
              {/* <span>
                Original Histories: {originalUserHistories[contract.id]?.length}
              </span> */}
            </div>

            <div>
              <span>App View</span>

              {appUserHistories[contract.id] &&
                appUserHistories[contract.id].length > 0 && (
                  <HistoriesWidget
                    address={walletAddress as Address}
                    histories={[...(appUserHistories[contract.id] || [])]}
                    contractId={contract.id}
                    hideTags={false}
                    // range={{ from: new Date("2024-11-01"), to: new Date() }}
                    mode="show_only_valid_activity"
                  />
                )}
            </div>

            <div>
              {/* <span>Original View</span>

              {originalUserHistories[contract.id] &&
                originalUserHistories[contract.id].length > 0 && (
                  <HistoriesWidget
                    address={walletAddress as Address}
                    histories={[...(originalUserHistories[contract.id] || [])]}
                    contractId={contract.id}
                    hideTags={false}
                    range={{ from: new Date("2024-11-01"), to: new Date() }}
                    mode="show_only_valid_activity"
                  />
                )} */}
            </div>
          </div>
        ))}
    </div>
  );
}
