"use client";

import { useMemo, useState, useCallback } from "react";
import { Address } from "viem";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  useDisclosure,
} from "@nextui-org/react";

import {
  useWithdrawAll,
  useGenerateFollower,
  useGetAllFollowerDetails,
  useGetAllFollowers,
  useSubscribeFollowerDetailUpdated,
} from "@/app-hooks/useFollower";
import { useGetAllContracts } from "@/app-hooks/useContract";
import { shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "@/app-components/FollowerWidgets/FollowerInfoWidget";
import { UserTradeHistory } from "@/app-components/UserWidgets/UserTradeHistory";
import { ShowPrivateKeyModal } from "@/app-components/FollowerWidgets/ShowPrivateKeyModal";

export default function Page() {
  const allFollowers = useGetAllFollowers();
  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();
  const withdrawAll = useWithdrawAll();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [contractId, setContractId] = useState<string | null>(null);
  const [followerAddress, setFollowerAddress] = useState<string | null>(null);

  const followerDetails = useGetAllFollowerDetails(contractId);
  useSubscribeFollowerDetailUpdated(contractId);

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const handleWithdrawAll = useCallback(
    (address: string, contractId: string) => {
      withdrawAll({
        variables: {
          input: {
            address,
            contractId: +contractId,
          },
        },
      });
    },
    [withdrawAll],
  );

  const followers = useMemo(() => {
    if (contractId === null) {
      return [];
    }

    return allFollowers.map((follower) => {
      const exist = followerDetails.find(
        (item) => item.address === follower.address,
      );

      if (exist) {
        return {
          address: exist.address,
          accountIndex: exist.accountIndex,
          publicKey: exist.publicKey,
          ethBalance: exist.ethBalance ? Number(exist.ethBalance) : 0,
          usdcBalance: exist.usdcBalance ? Number(exist.usdcBalance) : 0,
          contractId: exist.contractId,
        };
      } else {
        return {
          address: follower.address,
          accountIndex: follower.accountIndex,
          publicKey: follower.publicKey,
          usdcBalance: 0,
          ethBalance: 0,
          contractId: +contractId,
        };
      }
    });
  }, [allFollowers, contractId, followerDetails]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Autocomplete
          label="Follower Contract"
          variant="underlined"
          defaultItems={allContracts}
          placeholder="Search contract"
          selectedKey={contractId}
          className="w-[400px]"
          onSelectionChange={(key) => setContractId(key as string | null)}
        >
          {(item) => (
            <AutocompleteItem
              key={item.id}
              className="font-mono"
              textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
            >
              <div className="flex flex-col">
                <span className="text-small">Chain: {item.chainId}</span>
                <span className="text-small">Contract: {item.address}</span>
                <span className="text-tiny text-default-400">
                  {item.description}
                </span>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Button
          color="primary"
          variant="bordered"
          onClick={handleGenerateFollower}
        >
          + New
        </Button>
      </div>

      {contractId ? (
        <Accordion isCompact variant="splitted">
          {followers.map((follower) => (
            <AccordionItem
              key={follower.address}
              title={<FollowerInfoWidget follower={follower} />}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      onOpen();
                      setFollowerAddress(follower.address);
                    }}
                  >
                    Get Key
                  </Button>

                  <Button
                    onClick={() =>
                      handleWithdrawAll(
                        follower.address,
                        `${follower.contractId}`,
                      )
                    }
                  >
                    Withdraw All
                  </Button>
                </div>

                <UserTradeHistory
                  address={follower.address as Address}
                  contractId={contractId}
                />
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      ) : null}

      {followerAddress ? (
        <ShowPrivateKeyModal
          address={followerAddress as Address}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </div>
  );
}
