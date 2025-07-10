"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, Input, Button, CardBody } from "@nextui-org/react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import {
  ADD_TO_WHITELIST_DOCUMENT,
  GET_WHITELIST_DOCUMENT,
  REMOVE_FROM_WHITELIST_DOCUMENT,
} from "@/app/_hooks/usePlan";
import { NumericInput } from "@/components/inputs/NumericInput";
import { isAddress } from "viem";

const whitelistColumns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "minR2",
    component: "Min R2",
  },
  {
    id: "ratio",
    component: "Ratio",
  },
  {
    id: "maxSize",
    component: "Max Size",
  },
  {
    id: "action",
    component: "",
  },
];

export function WhitelistCard() {
  const { data: whitelist, refetch } = useQuery(GET_WHITELIST_DOCUMENT);

  const [addToWhitelist, { loading: addToWhitelistLoading }] = useMutation(
    ADD_TO_WHITELIST_DOCUMENT,
  );
  const [removeFromWhitelist] = useMutation(REMOVE_FROM_WHITELIST_DOCUMENT);

  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [minR2, setMinR2] = useState("0");
  const [maxSize, setMaxSize] = useState("0");
  const [ratio, setRatio] = useState("0");

  const whitelistRows = useMemo(() => {
    if (!whitelist) {
      return [];
    }

    return (whitelist.getWhitelist || [])
      .map(
        (whitelist) =>
          JSON.parse(whitelist) as {
            address: string;
            minR2: number;
            ratio: number;
            maxSize: number;
          },
      )
      .map((whitelist) => ({
        id: `${whitelist.address}`,
        className: "group",
        data: {
          address: {
            component: whitelist.address,
          },
          minR2: {
            component: whitelist.minR2,
          },
          ratio: {
            component: whitelist.ratio,
          },
          maxSize: {
            component: whitelist.maxSize,
          },
          action: {
            component: (
              <div className="flex items-center gap-4">
                <Button
                  isIconOnly
                  color="primary"
                  variant="flat"
                  onClick={() => {
                    removeFromWhitelist({
                      variables: {
                        address: whitelist.address,
                      },
                      onCompleted: () => {
                        refetch();
                      },
                    });
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            ),
          },
        },
      }));
  }, [refetch, removeFromWhitelist, whitelist]);

  const isValidRatio = !Number.isNaN(+ratio) && +ratio >= 0 && +ratio <= 1;
  const isValidMinR2 = !Number.isNaN(+minR2) && +minR2 >= 0 && +minR2 <= 1;
  const isValidMaxSize = !Number.isNaN(+maxSize) && +maxSize >= 0;

  const isDisabled =
    !isAddress(whitelistAddress) ||
    !isValidRatio ||
    !isValidMinR2 ||
    !isValidMaxSize;

  return (
    <Card>
      <CardHeader>Whitelist</CardHeader>

      <div className="flex items-center justify-end gap-4">
        <Input
          placeholder="Enter whitelist address"
          value={whitelistAddress}
          onChange={(e) => setWhitelistAddress(e.target.value)}
        />

        <NumericInput amount={minR2} onChange={setMinR2} label="Min R2" />

        <NumericInput amount={ratio} onChange={setRatio} label="Ratio" />

        <NumericInput amount={maxSize} onChange={setMaxSize} label="Max Size" />

        <Button
          isDisabled={isDisabled}
          isLoading={addToWhitelistLoading}
          onClick={() => {
            addToWhitelist({
              variables: {
                params: JSON.stringify({
                  address: whitelistAddress.toLowerCase(),
                  minR2: +minR2,
                  ratio: +ratio,
                  maxSize: +maxSize,
                }),
              },
              onCompleted: () => {
                setWhitelistAddress("");
                setMinR2("0");
                setRatio("0");
                setMaxSize("0");
                refetch();
              },
            });
          }}
          className="w-full"
        >
          Add to Whitelist
        </Button>
      </div>

      <CardBody>
        <DataTable
          columns={whitelistColumns}
          rows={whitelistRows}
          classNames={{
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      </CardBody>
    </Card>
  );
}
