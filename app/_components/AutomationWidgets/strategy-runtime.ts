export function parseSelectedPairs(
  str: string,
): { pair: string; isLong: boolean }[] {
  try {
    const selectedPairs = JSON.parse(str);

    if (!Array.isArray(selectedPairs)) {
      return [];
    }

    return selectedPairs
      .map((item: { pair: string; isLong: boolean } | string) =>
        typeof item === "string"
          ? [
              {
                pair: item.toLowerCase(),
                isLong: true,
              },
              {
                pair: item.toLowerCase(),
                isLong: false,
              },
            ]
          : [
              {
                pair: item.pair.toLowerCase(),
                isLong: item.isLong,
              },
            ],
      )
      .flat();
  } catch {
    return [];
  }
}
