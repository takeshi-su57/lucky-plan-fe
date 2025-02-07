"use client";

import { useMemo, useState, ChangeEventHandler } from "react";
import { Address } from "viem";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  Chip,
  Select,
  SelectItem,
  Switch,
  Card,
  CardBody,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGenerateFollower,
  useGetAllFollowerDetails,
  useGetAllFollowers,
  useSubscribeFollowerDetailUpdated,
} from "@/app-hooks/useFollower";
import { useGetAllContracts } from "@/app-hooks/useContract";
import { shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "@/app-components/FollowerWidgets/FollowerInfoWidget";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { FollowerDetails } from "../_components/FollowerWidgets/FollowerDetails";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allFollowers = useGetAllFollowers();
  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();

  const [contractId, setContractId] = useState<string | null>(
    searchParams.get("contractId") || null,
  );
  const [kind, setKind] = useState<PnlSnapshotKind>(
    (searchParams.get("kind") as PnlSnapshotKind) || PnlSnapshotKind.AllTime,
  );
  const [isChatFirst, setIsChatFirst] = useState(true);

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
      const contractQuery = contractId ? `contractId=${contractId}` : null;
      const kindQuery = value ? `kind=${value}` : null;

      router.push(
        `/followers?${contractQuery || ""}${contractQuery && kindQuery ? `&` : ""}${kindQuery || ""}`,
      );
    }
  };

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
          accUSDPnl:
            exist.pnlSnapshots.find((item) => item.kind === kind)?.accUSDPnl ||
            0,
        };
      } else {
        return {
          address: follower.address,
          accountIndex: follower.accountIndex,
          publicKey: follower.publicKey,
          usdcBalance: 0,
          ethBalance: 0,
          contractId: +contractId,
          accUSDPnl: 0,
        };
      }
    });
  }, [allFollowers, contractId, followerDetails, kind]);

  const { totalEarned, totalLost } = useMemo(() => {
    return followerDetails.reduce(
      (acc, item) => {
        const accUSDPnl =
          item.pnlSnapshots.find((item) => item.kind === kind)?.accUSDPnl || 0;

        return {
          totalEarned: acc.totalEarned + (accUSDPnl > 0 ? accUSDPnl : 0),
          totalLost: acc.totalLost + (accUSDPnl < 0 ? accUSDPnl : 0),
        };
      },
      { totalEarned: 0, totalLost: 0 },
    );
  }, [followerDetails, kind]);

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
            onSelectionChange={(key) => {
              setContractId(key as string | null);

              const contractQuery = key ? `contractId=${key}` : null;
              const kindQuery = kind ? `kind=${kind}` : null;

              router.push(
                `/followers?${contractQuery || ""}${contractQuery && kindQuery ? `&` : ""}${kindQuery || ""}`,
              );
            }}
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

          <Switch
            isSelected={isChatFirst}
            onValueChange={setIsChatFirst}
            size="sm"
          >
            Chat First
          </Switch>
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

          <Chip color="warning">{`${totalEarned} USDC`}</Chip>
          <Chip color="danger">{`${totalLost} USDC`}</Chip>

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

      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={followers}
            itemContent={(_, follower) => (
              <Accordion
                key={follower.address}
                isCompact
                variant="splitted"
                className="!mb-2"
              >
                <AccordionItem
                  title={<FollowerInfoWidget follower={follower} />}
                >
                  <FollowerDetails follower={follower} isChatFirst={false} />
                </AccordionItem>
              </Accordion>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
}
