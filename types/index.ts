export type Artist = {
  id: number
  name: string
  slug: string
  bio: string | null
  profile_image: string | null
  images: ImageType[]
  platforms: {
    social: Platform[];
    music: Platform[];
  };
  latest_session_slug: string | null
  created_at: string
  updated_at: string
}

export type ArtistList = {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  profile_image: string | null;
};

export type ArtistCompact = {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  profile_image: string | null;
  thumbnail_url: string | null;
  platforms: {
    social: Platform[];
    music: Platform[];
  };
};

export type LiveSession = {
  id: number
  title: string
  slug: string
  genre: string
  video_url: string
  description: string
  published_at: string
  artist: ArtistCompact
  participants: Participant[]
  created_at: string
  updated_at: string
}

export type LiveSessionList = {
  id: number
  title: string
  slug: string
  genre: string
  video_url: string
  published_at: string | null
  thumbnail_url: string | null
  artist: ArtistList
}

export type ImageType = {
  id: number
  url: string
  alt: string
  is_profile?: boolean
  is_thumbnail?: boolean
}

export type Platform = {
  name: string
  slug: string
  icon_url: string | null
  url: string
}

export type Participant = {
  id: number
  name: string
  slug: string
  platforms: Platform[]
}

export type RandomArtistImage = {
  id: number
  name: string
  slug: string
  image_url: string
}
