export type ArtistList = {
  id: number;
  name: string;
  slug: string;
  bio: string;
  profile_image: string;
};

export type Artist = {
  id: number
  name: string
  slug: string
  bio: string
  images: Image[]
  socials: Socials[]
  created_at: string
  updated_at: string
}

export type LiveSessionList = {
  id: number
  title: string
  slug: string
  published_at: string | null
  thumbnail_url: string
  artist: {
    name: string
    slug: string
  }
}

export type LiveSession = {
  id: number
  title: string
  slug: string
  video_url: string
  description: string
  published_at: string
  artist: Artist
  participants: Artist[]
  created_at: string
  updated_at: string
}


export type Image = {
  id: number
  url: string
  alt: string
  is_profile?: boolean
  is_thumbnail?: boolean
}

export type Socials = {
  name: string
  slug: string
  icon_url: string
  url: string
}
