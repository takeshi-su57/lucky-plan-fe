"use client";

import { useMemo, useState } from "react";
import { Tab, Tabs, Accordion, AccordionItem } from "@nextui-org/react";

import { MissionStatus } from "@/graphql/gql/graphql";

import { useGetAllMissions, useSubscribeMission } from "@/app-hooks/useMission";
import { useSubscribeTask } from "@/app-hooks/useTask";
import { MissionSummary } from "@/app-components/MissionWidgets/MissionSummary";
import { MissionDetails } from "@/app-components/MissionWidgets/MissionDetails";

type TabType = "all" | "created" | "opening" | "opened" | "closing" | "closed";

export default function Page() {
  const allMissions = useGetAllMissions();

  useSubscribeMission();
  useSubscribeTask();

  const [selected, setSelected] = useState<TabType>("all");

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
      });
  }, [allMissions, selected]);

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

      <Accordion isCompact variant="splitted">
        {rows.map((mission) => (
          <AccordionItem
            key={mission.id}
            title={<MissionSummary mission={mission} />}
          >
            <MissionDetails missionId={mission.id} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
