/* eslint-disable @typescript-eslint/no-explicit-any */

const DEFAULT_TTL = 5 * 60 * 1000;

export function makeCacheKey(prefix: string, params: any) {
  return `${prefix}:${JSON.stringify(params)}`;
}

export async function getCachedOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = DEFAULT_TTL
): Promise<T> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      const fresh = Date.now() - ts < ttl;
      console.debug(`[cache] key=${key} hit=${fresh ? "HIT" : "STALE"}`);
      if (fresh) return data as T; // <- retorna caché y NO llama a fetcher
    } else {
      console.debug(`[cache] key=${key} miss`);
    }
  } catch (e) {
    console.warn("[cache] read error", e);
  }

  console.debug("[cache] fetching from network for", key);
  const data = await fetcher();

  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
    console.debug(`[cache] key=${key} stored`);
  } catch (e) {
    console.warn("[cache] write error", e);
  }
  return data;
}
