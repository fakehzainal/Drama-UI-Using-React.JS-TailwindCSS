const API_BASE = 'https://api.sonzaix.indevs.in/drama';

// --- In-memory cache to avoid redundant network requests ---
const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(url: string): Promise<any> {
    const now = Date.now();
    const hit = cache.get(url);
    if (hit && now - hit.ts < CACHE_TTL) {
        return hit.data;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    cache.set(url, { data, ts: now });
    return data;
}

// --- Image optimization proxy ---
// Uses wsrv.nl to resize, compress, and convert images to WebP on-the-fly.
// This dramatically reduces image payload (often 70-90% smaller).
export function optimizeImageUrl(url: string, width: number = 300): string {
    if (!url) return '';
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=75&output=webp&il`;
}

export function optimizeImageUrlHQ(url: string, width: number = 600): string {
    if (!url) return '';
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=80&output=webp&il`;
}

// --- API functions ---

export async function fetchDramaList(category: string = 'korea', page: number = 1): Promise<any> {
    return cachedFetch(`${API_BASE}/home/${category}?page=${page}`);
}

export async function searchDrama(query: string, page: number = 1): Promise<any> {
    return cachedFetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&page=${page}`);
}

export async function fetchDramaInfo(id: string): Promise<any> {
    const data = await cachedFetch(`${API_BASE}/info?id=${id}`);
    delete data.author;
    delete data.contact;
    return data;
}

export async function fetchStreamInfo(streamingId: string): Promise<any> {
    const data = await cachedFetch(`${API_BASE}/stream?id=${streamingId}`);
    delete data.author;
    delete data.contact;
    return data;
}

// --- Prefetch: start loading landing page data immediately at module load ---
// This runs as soon as the JS bundle is parsed, BEFORE React mounts.
export const prefetchedHome = fetchDramaList('korea', 1);
