"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  RadioGroup,
  Radio,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { isAddress } from "viem";

import { useGetExpertPnlSnapshots } from "@/app/_hooks/usePlan";
import { AnalyzeWidget } from "./AnalyzeWidget";

export function ExperPanel() {
  const { pnlSnapshots, loading } = useGetExpertPnlSnapshots();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />

        <Button
          isDisabled={!isAddress(searchAddress)}
          onClick={() => {
            setSelectedAddress(searchAddress.toLowerCase());
          }}
        >
          Search
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Divider className="flex-1" />
        <span>Or</span>
        <Divider className="flex-1" />
      </div>

      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <RadioGroup
          label="Select expert"
          value={selectedAddress}
          onValueChange={setSelectedAddress}
        >
          {pnlSnapshots.map((snapshot) => (
            <Radio key={snapshot.address} value={snapshot.address}>
              <div className="flex items-center gap-2">
                <span>{snapshot.address}</span>
                <span>PNL: {snapshot.accUSDPnl}</span>
                <span>Score: {snapshot.score}</span>
                <span>Max Size: {snapshot.maxSize}</span>
                <span>Ratio: {snapshot.ratio}</span>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      )}
      {selectedAddress && (
        <Card>
          <CardBody>
            <AnalyzeWidget address={selectedAddress} />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
