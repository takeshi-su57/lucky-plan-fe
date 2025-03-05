"use client";

import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../providers";

export const GET_PRICES = "GET_PRICES";

function connectToPriceServer() {
  const websocket = new WebSocket("wss://backend-pricing.eu.gains.trade/v3");

  websocket.onmessage = (event) => {
    const data: number[] = JSON.parse(event.data);

    const updatedPrices: Record<number, number> = {};

    for (let i = 0; i < data.length; i += 2) {
      updatedPrices[data[i]] = data[i + 1];
    }

    queryClient.setQueryData([GET_PRICES], (data: Record<number, number>) => {
      return {
        ...data,
        ...updatedPrices,
      };
    });
  };

  websocket.onclose = () => {
    console.log("websocket disconnect");
    setTimeout(() => connectToPriceServer(), 60_000);
  };

  websocket.onerror = () => {
    console.log("websocket has errors");
    websocket.close();
  };
}

connectToPriceServer();

export function useGetPrices() {
  const { data } = useQuery({
    queryKey: [GET_PRICES],
    queryFn: async () => {
      return {} as Record<number, number>;
    },
  });

  return data;
}
