export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const currency = url.searchParams.get('currency') || 'ETH';
      const days = parseInt(url.searchParams.get('days') || '30');
      
      const cacheKey = `volatility-${currency}-${days}d`;
      const cache = caches.default;
      let cachedResponse = await cache.match(cacheKey);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      const endTimestamp = Date.now();
      const startTimestamp = endTimestamp - (days * 24 * 60 * 60 * 1000);

      const deribitUrl = `https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${currency}&start_timestamp=${startTimestamp}&end_timestamp=${endTimestamp}&resolution=86400`;
      
      const response = await fetch(deribitUrl);
      const data = await response.json();
      
      const newResponse = new Response(JSON.stringify(data.result.data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=1800',
        },
      });
      
      ctx.waitUntil(cache.put(cacheKey, newResponse.clone()));
      return newResponse;
    } catch (error) {
      return new Response(`Worker error: ${error.message}`, { status: 500 });
    }
  },
};
