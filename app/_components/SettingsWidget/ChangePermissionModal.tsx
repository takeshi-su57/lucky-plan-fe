"use client";

import { useEffect, useState } from "react";
import { Address } from "viem";
import { UserPermission } from "@/graphql/gql/graphql";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  AutocompleteItem,
  Autocomplete,
  Button,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";

import { useAllowAuto, useChangeUserPermission } from "@/app-hooks/useUser";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { NumericInput } from "@/components/inputs/NumericInput";
import { shrinkAddress } from "@/utils";
import { useCreateAutoPlan } from "@/app/_hooks/usePlan";

export type ChangePermissionModalProps = {
  user: {
    address: string;
    permission: UserPermission;
    allowAuto: boolean;
    budget: number;
    ratio: number;
    followerContractId: number;
  };
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export function ChangePermissionModal({
  user,
  isOpen,
  onOpenChange,
}: ChangePermissionModalProps) {
  const { mutateChangeUserPermission, loading: changeUserPermissionLoading } =
    useChangeUserPermission();
  const { mutateAllowAuto, loading: allowAutoLoading } = useAllowAuto();
  const { createAutoPlan, loading: autoPlanLoading } = useCreateAutoPlan();

  const allContracts = useGetAllContracts();

  const [permission, setPermission] = useState<UserPermission | null>(null);

  const [allowAuto, setAllowAuto] = useState<boolean>(false);
  const [budget, setBudget] = useState("0");
  const [ratio, setRatio] = useState("1");
  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setPermission(user.permission);
    setAllowAuto(user.allowAuto);
    setBudget(user.budget.toString());
    setRatio(user.ratio.toString());
    setFollowerContractId(
      user.followerContractId ? `${user.followerContractId}` : null,
    );
  }, [user]);

  const handleChangeUserPermission = () => {
    if (!permission) {
      return;
    }

    mutateChangeUserPermission({
      variables: {
        address: user.address,
        permission,
      },
    });
  };

  const handleCreateAutoPlan = () => {
    createAutoPlan({ variables: {} });
  };

  const handleAllowAuto = () => {
    if (allowAuto) {
      if (!followerContractId || followerContractId.trim() === "") {
        alert("Please select a follower contract");
        return;
      }

      if (Number.isNaN(+budget)) {
        alert("Invalid budget");
        return;
      }

      if (Number.isNaN(+ratio)) {
        alert("Invalid ratio");
        return;
      }

      mutateAllowAuto({
        variables: {
          address: user.address,
          allowAuto,
          budget: +budget,
          ratio: +ratio,
          followerContractId: +followerContractId,
        },
      });
    } else {
      mutateAllowAuto({
        variables: {
          address: user.address,
          allowAuto: false,
          budget: 0,
          ratio: 0,
          followerContractId: 0,
        },
      });
    }
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermission(e.target.value as UserPermission);
  };

  let budgetHelper = "";
  let ratioHelper = "";

  if (Number.isNaN(+budget)) {
    budgetHelper = "Invalid budget";
  } else if (+budget < 0) {
    budgetHelper = "Budget must be positive";
  }

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
  } else if (+ratio < 0) {
    ratioHelper = "Ratio must be positive";
  }

  const isDisabled =
    budgetHelper.trim() !== "" ||
    ratioHelper.trim() !== "" ||
    followerContractId === null ||
    followerContractId.trim() === "";

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Settings
        </h1>

        <div className="flex flex-row gap-4">
          <div className="flex flex-1 flex-col gap-3.5">
            <Select
              label="Permission"
              placeholder="Select an permission"
              selectedKeys={permission ? [permission] : undefined}
              variant="bordered"
              onChange={handleSelectionChange}
            >
              {Object.values(UserPermission).map((permission) => (
                <SelectItem key={permission}>{permission}</SelectItem>
              ))}
            </Select>

            <Button
              onClick={handleChangeUserPermission}
              color="primary"
              isDisabled={!permission}
              isLoading={changeUserPermissionLoading}
            >
              Change Permission
            </Button>

            <br />
            <br />

            {allowAuto ? (
              <Button
                onClick={handleCreateAutoPlan}
                color="secondary"
                isDisabled={!permission}
                isLoading={autoPlanLoading}
              >
                Generate Auto Plan
              </Button>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col gap-3.5">
            <Switch isSelected={allowAuto} onValueChange={setAllowAuto}>
              Allow Auto
            </Switch>

            {allowAuto ? (
              <Autocomplete
                label="Follower Contract"
                variant="underlined"
                defaultItems={allContracts}
                placeholder="Search contract"
                selectedKey={followerContractId}
                onSelectionChange={(key) =>
                  setFollowerContractId(key as string | null)
                }
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="font-mono"
                    textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-small">
                          Chain: {item.chainId}
                        </span>
                        <span className="text-small">
                          {item.isTestnet ? "(Testnet)" : ""}
                        </span>
                      </div>
                      <span className="text-small">
                        Contract: {shrinkAddress(item.address as Address)}
                      </span>
                      <span className="text-tiny text-default-400">
                        {item.description}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            ) : null}

            {allowAuto ? (
              <NumericInput
                amount={budget}
                onChange={setBudget}
                label="Budget"
                isDisabled={!allowAuto}
                errorMessage={budgetHelper}
                isInvalid={budgetHelper.trim() !== ""}
              />
            ) : null}

            {allowAuto ? (
              <NumericInput
                amount={ratio}
                onChange={setRatio}
                label="Ratio"
                isDisabled={!allowAuto}
                errorMessage={ratioHelper}
                isInvalid={ratioHelper.trim() !== ""}
              />
            ) : null}

            <Button
              onClick={handleAllowAuto}
              color="primary"
              isDisabled={isDisabled}
              isLoading={allowAutoLoading}
            >
              {allowAuto ? "Enable Auto Plan" : "Disable Auto Plan"}
            </Button>
          </div>
        </div>
      </div>
    </StandardModal>
  );
}
