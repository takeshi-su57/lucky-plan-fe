"use client";

import { PersonalTradeHistory } from "@/types";

export async function getPersonalTradeHistories(
  contractId: number,
  backendUrl: string,
  address: string,
): Promise<PersonalTradeHistory[]> {
  try {
    const response = await fetch(
      `${backendUrl}/personal-trading-history-table/${address}`,
    );

    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      contractId,
    })) as PersonalTradeHistory[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
