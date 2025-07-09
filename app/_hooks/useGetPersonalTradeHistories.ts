import { useQuery } from "@tanstack/react-query";
import { getPersonalTradeHistories } from "../_actions/getPersonalTradeHistories";

export const GET_PERSONAL_TRADE_HISTORIES = "GET_PERSONAL_TRADE_HISTORIES";

export function useGetPersonalTradeHistories(
  contractId: number | null,
  backendUrl: string | null,
  address: string | null,
) {
  return useQuery({
    queryKey: [GET_PERSONAL_TRADE_HISTORIES, contractId, backendUrl, address],
    queryFn: async () => {
      if (!backendUrl || !address || !contractId) {
        return [];
      }

      return await getPersonalTradeHistories(contractId, backendUrl, address);
    },
  });
}
