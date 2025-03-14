import { Action, TradeCollateral } from "@/graphql/gql/graphql";
import {
  PendingOrderType,
  PersonalTradeHistory,
  TradeActionType,
} from "@/types";

export function convertTradeActionToHistory(
  action: Action,
  collaterals: TradeCollateral[],
): (Omit<PersonalTradeHistory, "pair"> & { pairIndex: number }) | null {
  const args = JSON.parse(action.args);

  switch (action.name) {
    case "PositionSizeIncreaseExecuted": {
      if (args !== 0) {
        return null;
      }

      const collateral = collaterals.find(
        (c) => c.collateralIndex === args.collateralIndex,
      );

      const leverage = Number(args.values.newLeverage) / 1000;

      if (!collateral) {
        return null;
      }

      return {
        action: TradeActionType.TradePosSizeIncrease,
        address: args.orderId.user.toLowerCase(),
        block: action.blockNumber,
        collateralDelta: Number(
          Number(args.collateralDelta) / Number(collateral.precision),
        ),
        collateralIndex: Number(args.collateralIndex),
        collateralPriceUsd: Number(args.collateralPriceUsd) / 1e8,
        date: new Date(action.createdAt).toISOString(),
        leverage,
        leverageDelta: Number(args.leverageDelta) / 1e3,
        long: Number(args.long),
        marketPrice: Number(args.oraclePrice) / 1e10,
        pairIndex: args.pairIndex,
        pnl: Number(
          Number(args.values.borrowingFeeCollateral) /
            Number(collateral.precision),
        ),
        pnl_net: Number(
          Number(args.values.borrowingFeeCollateral) /
            Number(collateral.precision),
        ),
        price: Number(args.values.newOpenPrice) / 1e10,
        size: Number(
          Number(args.values.newCollateralAmount) /
            Number(collateral.precision),
        ),
        tradeId: null,
        tradeIndex: Number(args.index),
        tx: "",
      };
    }
    case "PositionSizeDecreaseExecuted": {
      if (args.cancelReason !== 0) {
        return null;
      }

      const collateral = collaterals.find(
        (c) => c.collateralIndex === args.collateralIndex,
      );

      const leverage = Number(args.values.newLeverage) / 1000;

      if (!collateral) {
        return null;
      }

      return {
        action: TradeActionType.TradePosSizeDecrease,
        address: args.orderId.user.toLowerCase(),
        block: action.blockNumber,
        collateralDelta: Number(
          -Number(args.collateralDelta) / Number(collateral.precision),
        ),
        collateralIndex: Number(args.collateralIndex),
        collateralPriceUsd: Number(args.collateralPriceUsd) / 1e8,
        date: new Date(action.createdAt).toISOString(),
        leverage,
        leverageDelta: Number(args.leverageDelta) / 1e3,
        long: Number(args.long),
        marketPrice: Number(args.oraclePrice) / 1e10,
        pairIndex: args.pairIndex,
        pnl: Number(
          Number(args.values.borrowingFeeCollateral) /
            Number(collateral.precision),
        ),
        pnl_net: Number(
          Number(args.values.borrowingFeeCollateral) /
            Number(collateral.precision),
        ),
        price: Number(args.values.priceAfterImpact) / 1e10,
        size: Number(
          Number(args.values.newCollateralAmount) /
            Number(collateral.precision),
        ),
        tradeId: null,
        tradeIndex: Number(args.index),
        tx: "",
      };
    }
    case "LeverageUpdateExecuted": {
      if (args.cancelReason !== 0) {
        return null;
      }

      const collateral = collaterals.find(
        (c) => c.collateralIndex === args.collateralIndex,
      );

      if (!collateral) {
        return null;
      }

      return {
        action: TradeActionType.TradeLeverageUpdate,
        address: args.orderId.user.toLowerCase(),
        block: action.blockNumber,
        collateralDelta: Number(
          ((args.isIncrease ? Number(1) : Number(-1)) *
            Number(args.collateralDelta)) /
            Number(collateral.precision),
        ),
        collateralIndex: Number(args.collateralIndex),
        collateralPriceUsd: 0,
        date: new Date(action.createdAt).toISOString(),
        leverage: Number(args.values.newLeverage) / 1e3,
        leverageDelta: null,
        long: 0,
        marketPrice: null,
        pairIndex: args.pairIndex,
        pnl: 0,
        pnl_net: 0,
        price: Number(args.values.oraclePrice) / 1e10,
        size: Number(
          Number(args.values.newCollateralAmount) /
            Number(collateral.precision),
        ),
        tradeId: null,
        tradeIndex: Number(args.index),
        tx: "",
      };
    }
    case "MarketExecuted": {
      const collateral = collaterals.find(
        (c) => c.collateralIndex === args.t.collateralIndex,
      );

      if (!collateral) {
        return null;
      }

      const pnl = args.open
        ? 0
        : Number(
            (Number(args.amountSentToTrader) -
              Number(args.t.collateralAmount)) /
              Number(collateral.precision),
          );

      return {
        action: args.open
          ? TradeActionType.TradeOpenedMarket
          : TradeActionType.TradeClosedMarket,
        address: args.orderId.user.toLowerCase(),
        block: action.blockNumber,
        collateralDelta: null,
        collateralIndex: Number(args.t.collateralIndex),
        collateralPriceUsd: Number(args.collateralPriceUsd) / 1e8,
        date: new Date(action.createdAt).toISOString(),
        leverage: Number(args.t.leverage) / 1e3,
        leverageDelta: null,
        long: Number(args.t.long),
        marketPrice: Number(args.marketPrice) / 1e10,
        pairIndex: args.t.pairIndex,
        pnl: pnl,
        pnl_net: pnl,
        price: Number(args.oraclePrice) / 1e10,
        size: Number(
          Number(args.t.collateralAmount) / Number(collateral.precision),
        ),
        tradeId: null,
        tradeIndex: Number(args.index),
        tx: "",
      };
    }
    case "LimitExecuted": {
      const collateral = collaterals.find(
        (c) => c.collateralIndex === args.t.collateralIndex,
      );

      if (!collateral) {
        return null;
      }

      const actionNameMap: Record<string, TradeActionType> = {
        [PendingOrderType.LIMIT_OPEN]: TradeActionType.TradeOpenedLimit,
        [PendingOrderType.LIQ_CLOSE]: TradeActionType.TradeClosedLIQ,
        [PendingOrderType.SL_CLOSE]: TradeActionType.TradeClosedSL,
        [PendingOrderType.TP_CLOSE]: TradeActionType.TradeClosedTP,
      };

      if (!actionNameMap[args.orderType]) {
        return null;
      }

      const pnl =
        args.orderType === PendingOrderType.LIMIT_OPEN
          ? 0
          : Number(
              (Number(args.amountSentToTrader) -
                Number(args.t.collateralAmount)) /
                Number(collateral.precision),
            );

      return {
        action: actionNameMap[args.orderType],
        address: args.orderId.user.toLowerCase(),
        block: action.blockNumber,
        collateralDelta: null,
        collateralIndex: Number(args.t.collateralIndex),
        collateralPriceUsd: Number(args.collateralPriceUsd) / 1e8,
        date: new Date(action.createdAt).toISOString(),
        leverage: Number(args.t.leverage) / 1e3,
        leverageDelta: null,
        long: Number(args.t.long),
        marketPrice: Number(args.marketPrice) / 1e10,
        pairIndex: args.t.pairIndex,
        pnl: pnl,
        pnl_net: pnl,
        price: Number(args.oraclePrice) / 1e10,
        size: Number(
          Number(args.t.collateralAmount) / Number(collateral.precision),
        ),
        tradeId: null,
        tradeIndex: Number(args.t.index),
        tx: "",
      };
    }
    default: {
      return null;
    }
  }
}
