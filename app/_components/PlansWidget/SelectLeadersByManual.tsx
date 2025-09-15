"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { nanoid } from "nanoid";

import { LeaderParams } from "@/types";
import { isAddress } from "viem";
import { FaPlus, FaTrash } from "react-icons/fa";

export type SelectLeadersByManualProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeadersByManual({
  leaders,
  onChangeLeaders,
  onNextStep,
  onPrevStep,
}: SelectLeadersByManualProps) {
  const [tempLeaders, setTempLeaders] = useState<LeaderParams[]>([]);

  const [address, setAddress] = useState("");

  useEffect(() => {
    setTempLeaders(leaders);
  }, [leaders]);

  const handleConfirm = () => {
    onChangeLeaders(tempLeaders);
    onNextStep();
  };

  const handleAddLeader = (address: string) => {
    setTempLeaders((prev) => {
      const exists = prev.find(
        (item) => item.address.toLowerCase() === address.toLowerCase(),
      );

      if (exists) {
        return prev;
      }

      return [
        ...prev,
        {
          virtualId: nanoid(),
          address,
          isConfirmed: false,
        },
      ];
    });
  };

  const handleRemoveLeader = (address: string) => {
    setTempLeaders((prev) => {
      return prev.filter(
        (item) => item.address.toLowerCase() !== address.toLowerCase(),
      );
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-4">
        <Input
          placeholder="Enter whitelist address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button
          isIconOnly
          color="primary"
          variant="flat"
          radius="sm"
          isDisabled={!isAddress(address)}
          onClick={() => {
            handleAddLeader(address);
          }}
        >
          <FaPlus />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {tempLeaders.map((item) => (
          <div
            key={item.virtualId}
            className="flex flex-row items-center justify-between"
          >
            <span>Address: {item.address}</span>

            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onClick={() => {
                handleRemoveLeader(item.address);
              }}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          size="sm"
        >
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
