import { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import { getPairs } from "@/web3/gns/v10/configs";
import { NumericInput } from "@/components/inputs/NumericInput";
import { StandardModal } from "@/components/modals/StandardModal";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPNLPercentage } from "@/utils";
import { getPercentageStr, getPriceStr } from "@/utils/price";

const pairs = getPairs(42161);

export function CalculatorButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pairIndex, setPairIndex] = useState<string>("0");
  const [collateralAmount, setCollateralAmount] = useState("0");
  const [leverage, setLeverage] = useState("0");
  const [long, setLong] = useState(true);

  const prices = useGetPrices();

  const [closePrice, setClosePrice] = useState("0");
  const [openPrice, setOpenPrice] = useState("0");

  const handleGetCurrentPrice = () => {
    if (Number.isNaN(Number(pairIndex))) {
      return;
    }

    const currentPrice = prices?.[Number(pairIndex)] || 0;
    setOpenPrice(currentPrice.toString());
    setClosePrice(currentPrice.toString());
  };

  const pnlPercentage = getPNLPercentage({
    closePrice: Number(closePrice),
    openPrice: Number(openPrice),
    leverage: Number(leverage),
    long,
  });

  const pnl = (Number(collateralAmount) * pnlPercentage) / 100;

  return (
    <>
      <Button onPress={onOpen}>Calculator</Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Calculator
          </h1>

          <Autocomplete
            label="Pair"
            variant="underlined"
            defaultItems={pairs}
            placeholder="Search pair"
            selectedKey={pairIndex}
            onSelectionChange={(key) => setPairIndex(key as string)}
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

          <Button onPress={handleGetCurrentPrice} color="secondary" size="sm">
            Get Price
          </Button>

          <NumericInput
            amount={openPrice}
            isDisabled={true}
            onChange={setOpenPrice}
            label="Open Price"
          />

          <NumericInput
            amount={closePrice}
            onChange={setClosePrice}
            label="Close Price"
          />

          <span
            className={twMerge(
              "text-sm",
              pnl >= 0 ? "text-green-700" : "text-red-700",
            )}
          >
            {`PnL: $${getPriceStr(pnl, 0)}`}
          </span>

          <span
            className={twMerge(
              "text-sm",
              pnlPercentage >= 0 ? "text-green-700" : "text-red-700",
            )}
          >
            {`${getPercentageStr(pnlPercentage)} %`}
          </span>
        </div>
      </StandardModal>
    </>
  );
}
