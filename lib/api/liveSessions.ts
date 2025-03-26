import type { LiveSession, LiveSessionList } from '@/types';

export async function getAllLiveSessions(): Promise<LiveSessionList[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/live-sessions`,
	);
	return (await res.json()).data;
}

export async function getLiveSession(slug: string): Promise<LiveSession> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/live-sessions/${slug}`,
	);
	return (await res.json()).data;
}

export async function getLatestLiveSession(): Promise<LiveSessionList[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/live-sessions/latest`,
  );
  return (await res.json()).data;
}
