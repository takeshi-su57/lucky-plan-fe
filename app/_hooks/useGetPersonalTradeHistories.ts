import { useQuery } from "@tanstack/react-query";
import { getPersonalTradeHistories } from "../_actions/getPersonalTradeHistories";

export const GET_PERSONAL_TRADE_HISTORIES = "GET_PERSONAL_TRADE_HISTORIES";

export function useGetPersonalTradeHistories(
  backendUrl: string | null,
  address: string | null,
) {
  return useQuery({
    queryKey: [GET_PERSONAL_TRADE_HISTORIES, backendUrl, address],
    queryFn: async () => {
      if (!backendUrl || !address) {
        return [];
      }

      return await getPersonalTradeHistories(backendUrl, address);
    },
  });
}
