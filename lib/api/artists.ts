import type { Artist, ArtistList, RandomArtistImage } from '@/types';

function getApiUrl(): string {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) {
		throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
	}
	return apiUrl;
}

async function handleApiResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(
			`API error: ${response.status} ${response.statusText}`
		);
	}

	// Workaround: clean response if there's garbage before JSON
	let text = await response.text();
	const jsonStart = text.indexOf('{');
	if (jsonStart > 0) {
		text = text.slice(jsonStart);
	}

	const data = JSON.parse(text);
	return data.data;
}

export async function getAllArtists(): Promise<ArtistList[]> {
	try {
		const res = await fetch(`${getApiUrl()}/api/artists`, {
			next: { revalidate: 60 }
		});
		return await handleApiResponse<ArtistList[]>(res);
	} catch (error) {
		console.error('Failed to fetch artists:', error);
		throw new Error('Impossible de récupérer les artistes');
	}
}

export async function getArtist(slug: string): Promise<Artist> {
	try {
		const res = await fetch(`${getApiUrl()}/api/artists/${slug}`, {
			next: { revalidate: 60 }
		});
		return await handleApiResponse<Artist>(res);
	} catch (error) {
		console.error(`Failed to fetch artist ${slug}:`, error);
		throw new Error('Impossible de récupérer cet artiste');
	}
}

export async function getRandomArtistImages(count: number = 12): Promise<RandomArtistImage[]> {
	try {
		const res = await fetch(`${getApiUrl()}/api/artists/random-images?count=${count}`, {
			cache: 'no-store' // Toujours random
		});

		if (!res.ok) {
			throw new Error(`API error: ${res.status} ${res.statusText}`);
		}

		// Workaround: clean response if there's garbage before JSON
		let text = await res.text();
		const jsonStart = text.indexOf('[');
		if (jsonStart > 0) {
			text = text.slice(jsonStart);
		}

		return JSON.parse(text);
	} catch (error) {
		console.error('Failed to fetch random artist images:', error);
		return [];
	}
}
