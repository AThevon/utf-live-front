import type { Artist, ArtistList } from '@/types';

export async function getAllArtists(): Promise<ArtistList[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artists`);
	return (await res.json()).data;
}

export async function getArtist(
	slug: string,
): Promise<Artist> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/artists/${slug}`,
	);
	return (await res.json()).data;
}
