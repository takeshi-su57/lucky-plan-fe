export function getAvntPositionKey(address: string, index: number) {
  return JSON.stringify({ address: address.toLowerCase(), index });
}

export function parseAvntPositionKey(positionKey: string) {
  const { address, index } = JSON.parse(positionKey);
  return { address, index: Number(index) };
}
