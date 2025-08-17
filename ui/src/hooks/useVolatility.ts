import { useQuery } from '@tanstack/react-query';
import { fetchVolatilityIndexData, type VolatilityIndexParams, type VolatilityDataPoint } from '../api/deribit';

interface UseVolatilityOptions extends VolatilityIndexParams {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useVolatility = ({
  currency = 'ETH',
  days = 1095,
  resolution = 86400,
  enabled = true,
  refetchInterval,
}: UseVolatilityOptions) => {
  return useQuery<VolatilityDataPoint[], Error>({
    queryKey: ['deribit-volatility', currency, days, resolution],
    queryFn: () => fetchVolatilityIndexData({
      currency,
      days,
      resolution,
    }),
    enabled,
    staleTime: 5 * 60 * 1000,
    refetchInterval,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export type { UseVolatilityOptions };
