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
  profile_image: string
  images: ImageType[]
  socials: Social[]
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
  genre: string
  video_url: string
  description: string
  published_at: string
  artist: Artist
  participants: Participant[]
  created_at: string
  updated_at: string
}


export type ImageType = {
  id: number
  url: string
  alt: string
  is_profile?: boolean
  is_thumbnail?: boolean
}

export type Social = {
  name: string
  slug: string
  icon_url: string
  url: string
}

export type Participant = {
  id: number
  name: string
  slug: string
  socials: Social[]
}
