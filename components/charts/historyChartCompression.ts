export type HistoryChartPoint = {
  value: number;
  label: string;
};

export type HistoryChartBucket = {
  avg: number;
  endLabel: string;
  max: number;
  min: number;
  startLabel: string;
};

const MIN_SAMPLES = 256;
const MAX_SAMPLES = 512;

export function compressHistoryChartData(
  data: HistoryChartPoint[],
  chartWidth: number,
): HistoryChartBucket[] {
  if (data.length === 0) return [];

  const targetSamples = Math.min(
    MAX_SAMPLES,
    Math.max(MIN_SAMPLES, Math.floor(chartWidth / 8)),
  );

  if (data.length <= targetSamples) {
    return data.map((point) => ({
      avg: point.value,
      endLabel: point.label,
      max: point.value,
      min: point.value,
      startLabel: point.label,
    }));
  }

  const bucketSize = Math.ceil(data.length / targetSamples);
  const buckets: HistoryChartBucket[] = [];

  for (let start = 0; start < data.length; start += bucketSize) {
    const points = data.slice(start, start + bucketSize);
    const values = points.map((point) => point.value);

    buckets.push({
      avg: values.reduce((sum, value) => sum + value, 0) / values.length,
      endLabel: points[points.length - 1].label,
      max: Math.max(...values),
      min: Math.min(...values),
      startLabel: points[0].label,
    });
  }

  return buckets;
}
