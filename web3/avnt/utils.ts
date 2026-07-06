export function getAvntPositionKey(
  address: string,
  pairIndex: number,
  index: number,
) {
  return JSON.stringify({ address: address.toLowerCase(), pairIndex, index });
}

export function parseAvntPositionKey(positionKey: string) {
  const { address, pairIndex, index } = JSON.parse(positionKey);
  return { address, pairIndex: Number(pairIndex), index: Number(index) };
}
