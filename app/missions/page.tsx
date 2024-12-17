"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { Tab, Tabs, Card, Button, CardBody, Chip } from "@nextui-org/react";
import { Address } from "viem";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import {
  MissionShallowDetailsInfoFragment,
  MissionStatus,
} from "@/graphql/gql/graphql";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";

import {
  useCloseMission,
  useGetAllMissions,
  useSubscribeMission,
} from "../_hooks/useMission";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "automation",
    component: "Automation",
    allowsSorting: true,
  },
  {
    id: "target",
    component: "Target Position",
    allowsSorting: true,
  },
  {
    id: "achieve",
    component: "Achieve Position",
  },
  {
    id: "status",
    component: "Status",
    allowsSorting: true,
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

type TabType = "all" | "created" | "opening" | "opened" | "closing" | "closed";

export default function Page() {
  const allMissions = useGetAllMissions();
  const closeMission = useCloseMission();

  useSubscribeMission();

  const [selected, setSelected] = useState<TabType>("all");

  const handleCloseMission = useCallback(
    (mission: MissionShallowDetailsInfoFragment) => {
      closeMission({
        variables: {
          id: mission.id,
        },
      });
    },
    [closeMission],
  );

  const rows = useMemo(() => {
    if (allMissions.length === 0) {
      return [];
    }
    return allMissions
      .sort((a, b) => b.id - a.id)
      .filter((mission) => {
        if (selected === "all") {
          return true;
        }

        if (selected === "created") {
          return mission.status === MissionStatus.Created;
        }
        if (selected === "opening") {
          return mission.status === MissionStatus.Opening;
        }
        if (selected === "opened") {
          return mission.status === MissionStatus.Opened;
        }

        if (selected === "closing") {
          return mission.status === MissionStatus.Closing;
        }

        if (selected === "closed") {
          return mission.status === MissionStatus.Closed;
        }

        return false;
      })
      .map((mission) => {
        let btnCom: ReactNode = null;

        if (
          mission.status === MissionStatus.Created ||
          mission.status === MissionStatus.Opened
        ) {
          btnCom = (
            <Button onClick={() => handleCloseMission(mission)} color="danger">
              Close
            </Button>
          );
        }

        return {
          id: `${mission.id}`,
          className: "group",
          data: {
            id: {
              sortableAmount: mission.id,
              component: mission.id,
            },
            automation: {
              sortableAmount: mission.botId,
              component: (
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    Leader:
                    <AddressWidget
                      address={mission.bot.leaderAddress as Address}
                    />
                  </span>
                  <span className="flex items-center gap-2">
                    Follower:
                    <AddressWidget
                      address={mission.bot.followerAddress as Address}
                    />
                  </span>
                </div>
              ),
            },
            target: {
              sortableAmount: mission.targetPositionId,
              component: (
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    Contract: {mission.targetPosition.contractId}
                  </span>
                  <span className="flex items-center gap-2">
                    Index: {mission.targetPosition.index}
                  </span>
                </div>
              ),
            },
            achieve: {
              component: mission.achievePosition ? (
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    Contract: {mission.achievePosition.contractId}
                  </span>
                  <span className="flex items-center gap-2">
                    Index: {mission.achievePosition.index}
                  </span>
                </div>
              ) : null,
            },
            status: {
              sortableAmount: mission.status,
              component: <Chip>{mission.status}</Chip>,
            },
            action: {
              component: btnCom,
              className: "w-[50px]",
            },
          },
        };
      });
  }, [allMissions, handleCloseMission, selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="all" title="All" />
          <Tab key="created" title="Created" />
          <Tab key="opening" title="Openning" />
          <Tab key="opened" title="Opened" />
          <Tab key="closing" title="Closing" />
          <Tab key="closed" title="Closed" />
        </Tabs>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
