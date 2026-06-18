"use client";

import { Button, Checkbox, Input, Select, SelectItem } from "@heroui/react";
import { Address, isAddress } from "viem";
import { useState, useMemo, ChangeEventHandler } from "react";
import { useGetPerpTradeHistories } from "@/app/_hooks/useHistory";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { Contract, Platform } from "@/graphql/gql/graphql";
import { getHistoriesChartData } from "@/utils/historiesV2Chart";
import { PaginatedViews } from "@/components/views/PaginatedViews";
import { PerpEventLogPnlChart } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";

const PAGE_SIZE = 10;

enum Filters {
  sort_by_r2 = "sort_by_r2",
  sort_by_slope = "sort_by_slope",
  sort_by_duration = "sort_by_duration",
  sort_by_size = "sort_by_size",
  sort_by_collateral = "sort_by_collateral",
  sort_by_leverage = "sort_by_leverage",
  sort_by_pnl_p = "sort_by_pnl_p",
}

export function AnalyzePanel() {
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [text, setText] = useState<string>("");
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<Filters>(Filters.sort_by_r2);
  const [checkByLatest128Trades, setCheckByLatest128Trades] = useState(false);

  const allContracts = useGetAllContracts();

  const { histories, loading } = useGetPerpTradeHistories(
    filteredAddresses,
    platform,
  );

  const handleParseFilters = () => {
    const filters = text.trim().split(",");

    setFilteredAddresses(
      filters
        .filter((filter) => isAddress(filter.trim()))
        .map((filter) => filter.trim().toLowerCase()),
    );
  };

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  const handleChangeSortBy: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setSortBy(value as Filters);
    }
  };

  const data = useMemo(() => {
    const contractsMapa: Record<number, Contract> = {};

    allContracts.forEach((contract) => {
      contractsMapa[contract.id] = contract;
    });

    return histories
      .map((logs) => {
        if (logs.length === 0) {
          return null;
        }

        const calculated = getHistoriesChartData(logs, {
          range: undefined,
        });

        return {
          address: logs[0].address,
          calculated,
          logs,
        };
      })
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (sortBy === Filters.sort_by_slope) {
          return checkByLatest128Trades
            ? b.calculated.latestSlope - a.calculated.latestSlope
            : b.calculated.slope - a.calculated.slope;
        }

        if (sortBy === Filters.sort_by_duration) {
          return checkByLatest128Trades
            ? b.calculated.duration.latest.avg -
                a.calculated.duration.latest.avg
            : b.calculated.duration.total.avg - a.calculated.duration.total.avg;
        }

        if (sortBy === Filters.sort_by_size) {
          return checkByLatest128Trades
            ? b.calculated.size.latest.avg - a.calculated.size.latest.avg
            : b.calculated.size.total.avg - a.calculated.size.total.avg;
        }

        if (sortBy === Filters.sort_by_collateral) {
          return checkByLatest128Trades
            ? b.calculated.collateral.latest.avg -
                a.calculated.collateral.latest.avg
            : b.calculated.collateral.total.avg -
                a.calculated.collateral.total.avg;
        }

        if (sortBy === Filters.sort_by_leverage) {
          return checkByLatest128Trades
            ? b.calculated.leverage.latest.avg -
                a.calculated.leverage.latest.avg
            : b.calculated.leverage.total.avg - a.calculated.leverage.total.avg;
        }

        if (sortBy === Filters.sort_by_pnl_p) {
          return checkByLatest128Trades
            ? b.calculated.pnlP.latest.avgBySize -
                a.calculated.pnlP.latest.avgBySize
            : b.calculated.pnlP.total.avgBySize -
                a.calculated.pnlP.total.avgBySize;
        }

        return checkByLatest128Trades
          ? b.calculated.latestR2 - a.calculated.latestR2
          : b.calculated.r2 - a.calculated.r2;
      });
  }, [allContracts, checkByLatest128Trades, histories, sortBy]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-6">
        <Select
          variant="underlined"
          label="Platform"
          selectedKeys={platform ? [platform] : undefined}
          onChange={handleChangePlatform}
          selectionMode="single"
          className="w-50 font-mono"
        >
          {Object.values(Platform).map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>

        <Select
          variant="underlined"
          label="Sort by"
          selectedKeys={sortBy ? [sortBy] : undefined}
          onChange={handleChangeSortBy}
          selectionMode="single"
          className="w-50 font-mono"
        >
          {Object.values(Filters).map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Select>

        <Checkbox
          checked={checkByLatest128Trades}
          onValueChange={setCheckByLatest128Trades}
        >
          Check by latest 128 trades
        </Checkbox>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by addresses"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          color="primary"
          size="sm"
          isDisabled={text.trim().length === 0}
          onPress={handleParseFilters}
        >
          Filter
        </Button>
      </div>

      <PaginatedViews
        currentPage={page}
        totalPages={Math.ceil(data.length / PAGE_SIZE)}
        onChangePage={setPage}
        loading={loading}
      >
        <div className="flex h-175 w-full flex-col gap-6 overflow-y-auto">
          {data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((item) => (
            <PerpEventLogPnlChart
              key={item.address}
              address={item.address as Address}
              platform={platform}
              perpTradeHistories={item.logs}
              showLatestStats={checkByLatest128Trades}
            />
          ))}
        </div>
      </PaginatedViews>
    </div>
  );
}
