"use client";

import { useMemo, useState } from "react";
import { Button, ButtonGroup, Chip, useDisclosure } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpdateSl } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPriceStr } from "@/utils/price";

type SlMode = "price" | "percent";

export type SlUpdateButtonProps = {
  address: string;
  contractId: number;
  index: number;
  pairIndex: number;
  long: boolean;
};

export function SlUpdateButton({
  address,
  contractId,
  index,
  pairIndex,
  long,
}: SlUpdateButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { updateSl, loading } = useUpdateSl();
  const pairPrices = useGetPrices();

  const [slPrice, setSlPrice] = useState("0");
  const [slPercent, setSlPercent] = useState("0");
  const [slMode, setSlMode] = useState<SlMode>("price");

  const currentPairPrice = pairPrices?.[pairIndex];

  const rawSl = useMemo(() => {
    if (slMode === "price") return slPrice;
    if (!currentPairPrice) return "0";
    const pct = Number(slPercent);
    if (Number.isNaN(pct)) return "0";
    const slVal = long
      ? currentPairPrice * (1 - pct / 100)
      : currentPairPrice * (1 + pct / 100);
    return Math.floor(slVal * 1e10).toString();
  }, [slMode, slPrice, slPercent, currentPairPrice, long]);

  const handleUpdate = () => {
    const value = slMode === "price" ? slPrice : slPercent;
    if (value.trim() === "") return;

    updateSl({
      variables: {
        input: {
          address,
          contractId,
          index,
          newSl: rawSl,
        },
      },
      onCompleted: () => {
        setSlPrice("0");
        setSlPercent("0");
        onClose();
      },
    });
  };

  const handleFillCurrentPrice = () => {
    if (!currentPairPrice) return;
    setSlPrice(Math.floor(currentPairPrice * 1e10).toString());
  };

  const isDisabledUpdate =
    slMode === "price" ? slPrice.trim() === "" : slPercent.trim() === "";

  return (
    <>
      <Button color="default" size="sm" onPress={onOpen} isLoading={loading}>
        Update SL
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Update SL
          </h1>

          <div className="flex flex-col gap-4">
            {currentPairPrice !== undefined && (
              <Chip variant="flat" size="sm">
                Current Price: {getPriceStr(currentPairPrice)}
              </Chip>
            )}

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <ButtonGroup size="sm" variant="flat">
                  <Button
                    color={slMode === "price" ? "primary" : "default"}
                    onPress={() => setSlMode("price")}
                  >
                    Price
                  </Button>
                  <Button
                    color={slMode === "percent" ? "primary" : "default"}
                    onPress={() => setSlMode("percent")}
                  >
                    %
                  </Button>
                </ButtonGroup>

                {slMode === "price" && currentPairPrice !== undefined && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleFillCurrentPrice}
                    className="text-xs"
                  >
                    Current Price
                  </Button>
                )}
              </div>

              {slMode === "price" ? (
                <NumericInput
                  amount={slPrice}
                  onChange={setSlPrice}
                  label="SL Price (1e10)"
                />
              ) : (
                <NumericInput
                  amount={slPercent}
                  onChange={setSlPercent}
                  label={`SL % (${long ? "below" : "above"} current price)`}
                />
              )}

              {slMode === "percent" &&
                currentPairPrice !== undefined &&
                Number(slPercent) > 0 && (
                  <span className="text-xs text-neutral-500">
                    ={" "}
                    {getPriceStr(
                      long
                        ? currentPairPrice * (1 - Number(slPercent) / 100)
                        : currentPairPrice * (1 + Number(slPercent) / 100),
                    )}{" "}
                    USD
                  </span>
                )}
            </div>

            <Button
              onPress={handleUpdate}
              isDisabled={isDisabledUpdate}
              isLoading={loading}
              className="w-45"
            >
              Update SL
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
