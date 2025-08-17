type VolatilityDataPoint = [number, number, number, number, number];

interface VolatilityIndexParams {
  currency: string;
  days?: number;
  resolution?: number;
}

export const fetchVolatilityIndexData = async ({
  currency,
  days = 30,
  resolution = 86400,
}: VolatilityIndexParams): Promise<VolatilityDataPoint[]> => {
  const baseUrl = 'https://volatility-api.dinadeljanin.workers.dev';
    
  const params = new URLSearchParams({
    currency,
    days: days.toString(),
    resolution: resolution.toString(),
  });

  const response = await fetch(`${baseUrl}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Volatility API error: ${response.status} ${response.statusText}`);
  }

  const response_data = await response.json();
  
  return Array.isArray(response_data) ? response_data : [];
};

export type { VolatilityDataPoint, VolatilityIndexParams };
