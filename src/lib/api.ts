const API_BASE = 'https://api.sonzaix.indevs.in/drama';

export async function fetchDramaList(category: string = 'korea', page: number = 1): Promise<any> {
    const res = await fetch(`${API_BASE}/home/${category}?page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch drama list');
    return res.json();
}

export async function searchDrama(query: string, page: number = 1): Promise<any> {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&page=${page}`);
    if (!res.ok) throw new Error('Failed to search dramas');
    return res.json();
}

export async function fetchDramaInfo(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/info?id=${id}`);
    if (!res.ok) throw new Error('Failed to fetch drama info');
    const data = await res.json();
    delete data.author;
    delete data.contact;
    return data;
}

export async function fetchStreamInfo(streamingId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/stream?id=${streamingId}`);
    if (!res.ok) throw new Error('Failed to fetch stream info');
    const data = await res.json();
    delete data.author;
    delete data.contact;
    return data;
}
