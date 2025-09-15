import { PerpTradeHistoryWithDate } from "@/graphql/gql/graphql";

export type PerpTradeHistory = Omit<PerpTradeHistoryWithDate, "date">;
