export function getGnsPositionKey(address: string, index: number) {
  return JSON.stringify({ address: address.toLowerCase(), index });
}

export function parseGnsPositionKey(positionKey: string) {
  const { address, index } = JSON.parse(positionKey);
  return { address, index: Number(index) };
}
