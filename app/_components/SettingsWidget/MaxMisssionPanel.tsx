"use client";

import {
  useGetMaxOpenMissions,
  useUpdateMaxOpenMissions,
} from "@/app/_hooks/useMission";
import { NumericInput } from "@/components/inputs/NumericInput";
import { StandardModal } from "@/components/modals/StandardModal";
import { Button, useDisclosure } from "@heroui/react";
import { useState } from "react";

export function MaxMissionPanel() {
  const { data } = useGetMaxOpenMissions();
  const { updateMaxOpenMissions, loading } = useUpdateMaxOpenMissions();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [maxOpenMissions, setMaxOpenMissions] = useState(
    `${data?.getMaxOpenMissions || 0}`,
  );

  let maxOpenMissionsHelper = "";

  if (Number.isNaN(+maxOpenMissions)) {
    maxOpenMissionsHelper = "Invalid max open missions";
  }

  const handleConfirm = () => {
    if (maxOpenMissionsHelper.trim() !== "") {
      return;
    }

    updateMaxOpenMissions({
      variables: {
        maxCount: +maxOpenMissions,
      },
    });

    onClose();
  };

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4">
        <span>Max Open Missions: </span>

        <span>{data?.getMaxOpenMissions || 0}</span>
      </div>

      <Button onClick={onOpen}>Update Max Open Missions</Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{ base: "max-w-[350px]" }}
      >
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Update Max Open Missions
          </h1>

          <NumericInput
            amount={maxOpenMissions}
            onChange={setMaxOpenMissions}
            label="Max Open Missions"
            errorMessage={maxOpenMissionsHelper}
            isInvalid={maxOpenMissionsHelper.trim() !== ""}
          />

          <Button
            onClick={handleConfirm}
            color="primary"
            isDisabled={maxOpenMissionsHelper.trim() !== "" || loading}
            isLoading={loading}
          >
            Update
          </Button>
        </div>
      </StandardModal>
    </div>
  );
}
