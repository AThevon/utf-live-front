import type { LiveSession, LiveSessionList } from '@/types';

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

export async function getAllLiveSessions(): Promise<LiveSessionList[]> {
	try {
		const res = await fetch(`${getApiUrl()}/api/live-sessions`, {
			next: { revalidate: 60 }
		});
		return await handleApiResponse<LiveSessionList[]>(res);
	} catch (error) {
		console.error('Failed to fetch live sessions:', error);
		throw new Error('Impossible de récupérer les sessions live');
	}
}

export async function getLiveSession(slug: string): Promise<LiveSession> {
	try {
		const res = await fetch(`${getApiUrl()}/api/live-sessions/${slug}`, {
			next: { revalidate: 60 }
		});
		return await handleApiResponse<LiveSession>(res);
	} catch (error) {
		console.error(`Failed to fetch live session ${slug}:`, error);
		throw new Error('Impossible de récupérer cette session live');
	}
}

export async function getLatestLiveSession(): Promise<LiveSessionList[]> {
	try {
		const res = await fetch(`${getApiUrl()}/api/live-sessions/latest`, {
			next: { revalidate: 60 }
		});
		return await handleApiResponse<LiveSessionList[]>(res);
	} catch (error) {
		console.error('Failed to fetch latest live sessions:', error);
		throw new Error('Impossible de récupérer les dernières sessions');
	}
}
