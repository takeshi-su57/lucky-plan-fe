"use client";

import { useMemo, useState } from "react";
import { Button, ButtonGroup, Chip, useDisclosure } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useUpdateTp } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPriceStr } from "@/utils/price";

type TpMode = "price" | "percent";

export type TpUpdateButtonProps = {
  address: string;
  contractId: number;
  index: number;
  pairIndex: number;
  long: boolean;
};

export function TpUpdateButton({
  address,
  contractId,
  index,
  pairIndex,
  long,
}: TpUpdateButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { updateTp, loading } = useUpdateTp();
  const pairPrices = useGetPrices();

  const [tpPrice, setTpPrice] = useState("0");
  const [tpPercent, setTpPercent] = useState("0");
  const [tpMode, setTpMode] = useState<TpMode>("price");

  const currentPairPrice = pairPrices?.[pairIndex];

  const rawTp = useMemo(() => {
    if (tpMode === "price") return tpPrice;
    if (!currentPairPrice) return "0";
    const pct = Number(tpPercent);
    if (Number.isNaN(pct)) return "0";
    const tpVal = long
      ? currentPairPrice * (1 + pct / 100)
      : currentPairPrice * (1 - pct / 100);
    return Math.floor(tpVal * 1e10).toString();
  }, [tpMode, tpPrice, tpPercent, currentPairPrice, long]);

  const handleUpdate = () => {
    const value = tpMode === "price" ? tpPrice : tpPercent;
    if (value.trim() === "") return;

    updateTp({
      variables: {
        input: {
          address,
          contractId,
          index,
          newTp: rawTp,
        },
      },
      onCompleted: () => {
        setTpPrice("0");
        setTpPercent("0");
        onClose();
      },
    });
  };

  const handleFillCurrentPrice = () => {
    if (!currentPairPrice) return;
    setTpPrice(Math.floor(currentPairPrice * 1e10).toString());
  };

  const isDisabledUpdate =
    tpMode === "price" ? tpPrice.trim() === "" : tpPercent.trim() === "";

  return (
    <>
      <Button color="default" size="sm" onPress={onOpen} isLoading={loading}>
        Update TP
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Update TP
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
                    color={tpMode === "price" ? "primary" : "default"}
                    onPress={() => setTpMode("price")}
                  >
                    Price
                  </Button>
                  <Button
                    color={tpMode === "percent" ? "primary" : "default"}
                    onPress={() => setTpMode("percent")}
                  >
                    %
                  </Button>
                </ButtonGroup>

                {tpMode === "price" && currentPairPrice !== undefined && (
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

              {tpMode === "price" ? (
                <NumericInput
                  amount={tpPrice}
                  onChange={setTpPrice}
                  label="TP Price (1e10)"
                />
              ) : (
                <NumericInput
                  amount={tpPercent}
                  onChange={setTpPercent}
                  label={`TP % (${long ? "above" : "below"} current price)`}
                />
              )}

              {tpMode === "percent" &&
                currentPairPrice !== undefined &&
                Number(tpPercent) > 0 && (
                  <span className="text-xs text-neutral-500">
                    ={" "}
                    {getPriceStr(
                      long
                        ? currentPairPrice * (1 + Number(tpPercent) / 100)
                        : currentPairPrice * (1 - Number(tpPercent) / 100),
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
              Update TP
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
