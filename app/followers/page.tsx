"use client";

import { useMemo, useState, useCallback, ChangeEventHandler } from "react";
import { Address } from "viem";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  useDisclosure,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";

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
import { PnlSnapshotKind } from "@/graphql/gql/graphql";

export default function Page() {
  const allFollowers = useGetAllFollowers();
  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();
  const withdrawAll = useWithdrawAll();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [contractId, setContractId] = useState<string | null>(null);
  const [kind, setKind] = useState<PnlSnapshotKind>(PnlSnapshotKind.AllTime);

  const [followerAddress, setFollowerAddress] = useState<string | null>(null);

  const followerDetails = useGetAllFollowerDetails(contractId);
  useSubscribeFollowerDetailUpdated(contractId);

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);
    }
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
        <div className="flex items-center gap-4">
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

          <Select
            variant="underlined"
            label="Before"
            selectedKeys={kind ? [kind] : undefined}
            onChange={handleChangeKind}
            selectionMode="single"
            className="w-[200px] font-mono"
          >
            {Object.values(PnlSnapshotKind).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Chip>
            {`${(
              followers
                .map((item) => item.ethBalance)
                .reduce((acc, item) => acc + item, 0) / 1e18
            ).toFixed(8)} ETH`}
          </Chip>

          <Chip>
            {`${(
              followers
                .map((item) => item.usdcBalance)
                .reduce((acc, item) => acc + item, 0) / 1e6
            ).toFixed(2)} USDC`}
          </Chip>

          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onClick={handleGenerateFollower}
          >
            <FaPlus />
          </Button>
        </div>
      </div>

      {contractId ? (
        <Accordion isCompact variant="splitted">
          {followers.map((follower) => (
            <AccordionItem
              key={follower.address}
              title={<FollowerInfoWidget follower={follower} kind={kind} />}
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
