"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Switch,
  useDisclosure,
} from "@nextui-org/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useOpenTradeMarket } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

import { getPairs } from "@/web3/gns/v10/configs";

const pairs = getPairs(42161);

export type OpenPositionButtonProps = {
  address: string;
  contractId: number;
};

export function OpenPositionButton({
  address,
  contractId,
}: OpenPositionButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { openTradeMarket, loading } = useOpenTradeMarket();

  const [pairIndex, setPairIndex] = useState<string | null>(null);
  const [collateralAmount, setCollateralAmount] = useState("0");
  const [leverage, setLeverage] = useState("0");
  const [long, setLong] = useState(true);
  const [sl, setSl] = useState("0");
  const [tp, setTp] = useState("0");

  const handleOpen = () => {
    openTradeMarket({
      variables: {
        input: {
          address,
          contractId,
          pairIndex: Number(pairIndex),
          leverage: Math.floor(Number(leverage) * 1e3),
          collateralAmount: Math.floor(
            Number(collateralAmount) * 1e6,
          ).toString(),
          long,
          sl,
          tp,
        },
      },
      onCompleted: () => {
        setPairIndex("0");
        setCollateralAmount("0");
        setLeverage("0");
        setLong(true);
        setSl("0");
        setTp("0");
        onClose();
      },
    });
  };

  const isDisabledOpen =
    pairIndex === null ||
    collateralAmount.trim() === "" ||
    leverage.trim() === "" ||
    sl.trim() === "" ||
    tp.trim() === "";

  return (
    <>
      <Button color="secondary" size="sm" onClick={onOpen} isLoading={loading}>
        Open Position
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Open Position
          </h1>

          <div className="flex flex-col gap-4">
            <Autocomplete
              label="Pair"
              variant="underlined"
              defaultItems={pairs}
              placeholder="Search pair"
              selectedKey={pairIndex}
              onSelectionChange={(key) => setPairIndex(key as string | null)}
            >
              {(item) => (
                <AutocompleteItem key={item.pairIndex} className="font-mono">
                  {`${item.from}/${item.to}`}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <NumericInput
              amount={collateralAmount}
              onChange={setCollateralAmount}
              label="Collateral USDC Amount"
            />

            <NumericInput
              amount={leverage}
              onChange={setLeverage}
              label="Leverage"
            />

            <Switch
              isSelected={long}
              color={long ? "success" : "danger"}
              onValueChange={setLong}
            >
              {long ? "Long" : "Short"}
            </Switch>

            <NumericInput
              amount={sl}
              onChange={setSl}
              label="SL Price (BigInt)"
            />

            <NumericInput
              amount={tp}
              onChange={setTp}
              label="TP Price (BigInt)"
            />

            <Button
              onClick={handleOpen}
              isDisabled={isDisabledOpen}
              isLoading={loading}
              className="w-[180px]"
            >
              Open Position
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
