import { createClient } from '@/lib/supabase/server'

// Helper function to build S3 URL
function getS3Url(path: string): string {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${path}`
}

// Helper to get images for an artist
async function getArtistImages(supabase: any, artistId: number) {
  const { data: images } = await supabase
    .from('images')
    .select('id, path, alt, is_profile, is_thumbnail')
    .eq('imageable_id', artistId)
    .eq('imageable_type', 'Artist')

  return images || []
}

// Artists queries
export async function getAllArtists() {
  const supabase = await createClient()

  // Get artists who have at least one live session (as main artist, not participant)
  const { data: artistsWithSessions, error: sessionsError } = await supabase
    .from('live_sessions')
    .select('artist_id')

  if (sessionsError) throw sessionsError

  // Get unique artist IDs that have live sessions
  const artistIdsWithSessions = [...new Set(artistsWithSessions.map((s: any) => s.artist_id))]

  if (artistIdsWithSessions.length === 0) {
    return []
  }

  const { data: artists, error } = await supabase
    .from('artists')
    .select('id, name, slug, bio, created_at, updated_at')
    .in('id', artistIdsWithSessions)
    .order('created_at', { ascending: false })

  if (error) throw error

  // Get images for all artists
  const artistIds = artists.map((a: any) => a.id)
  const { data: allImages } = await supabase
    .from('images')
    .select('id, path, alt, is_profile, imageable_id')
    .in('imageable_id', artistIds)
    .eq('imageable_type', 'Artist')
    .eq('is_profile', true)

  const imagesByArtist = (allImages || []).reduce((acc: any, img: any) => {
    acc[img.imageable_id] = img
    return acc
  }, {})

  return artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    bio: artist.bio,
    profile_image: imagesByArtist[artist.id]?.path
      ? getS3Url(imagesByArtist[artist.id].path)
      : null,
  }))
}

export async function getArtistBySlug(slug: string) {
  const supabase = await createClient()

  const { data: artist, error } = await supabase
    .from('artists')
    .select(`
      id,
      name,
      slug,
      bio,
      created_at,
      updated_at,
      artist_platform_links(
        id,
        url,
        platform:platforms(name, slug, type, icon)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error

  // Get images separately
  const images = await getArtistImages(supabase, artist.id)

  // Get latest session slug
  const { data: latestSession } = await supabase
    .from('live_sessions')
    .select('slug')
    .eq('artist_id', artist.id)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  // Transform to match Laravel API format
  const socialPlatforms = artist.artist_platform_links
    ?.filter((link: any) => link.platform.type === 'social')
    .map((link: any) => ({
      name: link.platform.name,
      slug: link.platform.slug,
      icon_url: link.platform.icon ? getS3Url(link.platform.icon) : null,
      url: link.url,
    })) || []

  const musicPlatforms = artist.artist_platform_links
    ?.filter((link: any) => link.platform.type === 'music')
    .map((link: any) => ({
      name: link.platform.name,
      slug: link.platform.slug,
      icon_url: link.platform.icon ? getS3Url(link.platform.icon) : null,
      url: link.url,
    })) || []

  const profileImage = images.find((img: any) => img.is_profile)

  return {
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    bio: artist.bio,
    profile_image: profileImage?.path ? getS3Url(profileImage.path) : null,
    images: images.map((img: any) => ({
      id: img.id,
      url: getS3Url(img.path),
      alt: img.alt,
      is_profile: img.is_profile,
      is_thumbnail: img.is_thumbnail,
    })),
    platforms: {
      social: socialPlatforms,
      music: musicPlatforms,
    },
    latest_session_slug: latestSession?.slug || null,
    created_at: artist.created_at,
    updated_at: artist.updated_at,
  }
}

export async function getRandomArtistImages(count: number = 12) {
  const supabase = await createClient()

  // Get all images with artist info
  const { data: images, error } = await supabase
    .from('images')
    .select('id, path, alt, imageable_id')
    .eq('imageable_type', 'Artist')

  if (error) throw error

  // Get all artists
  const { data: artists } = await supabase
    .from('artists')
    .select('id, name, slug')

  const artistsById = (artists || []).reduce((acc: any, artist: any) => {
    acc[artist.id] = artist
    return acc
  }, {})

  // Build result
  const allImages = (images || [])
    .filter((img: any) => artistsById[img.imageable_id])
    .map((img: any) => ({
      id: img.id,
      name: artistsById[img.imageable_id].name,
      slug: artistsById[img.imageable_id].slug,
      image_url: getS3Url(img.path),
    }))

  // Shuffle array
  const shuffled = allImages.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Live Sessions queries
export async function getAllLiveSessions() {
  const supabase = await createClient()

  const { data: sessions, error } = await supabase
    .from('live_sessions')
    .select(`
      id,
      title,
      slug,
      genre,
      video_url,
      published_at,
      artist_id,
      artist:artists(id, name, slug, bio)
    `)
    .order('published_at', { ascending: false })

  if (error) throw error

  // Get thumbnail images for all artists
  const artistIds = sessions.map((s: any) => s.artist_id)
  const { data: thumbnailImages } = await supabase
    .from('images')
    .select('id, path, imageable_id')
    .in('imageable_id', artistIds)
    .eq('imageable_type', 'Artist')
    .eq('is_thumbnail', true)

  const thumbnailByArtist = (thumbnailImages || []).reduce((acc: any, img: any) => {
    acc[img.imageable_id] = img
    return acc
  }, {})

  return sessions.map((session: any) => {
    const artist = Array.isArray(session.artist) ? session.artist[0] : session.artist
    const thumbnail = thumbnailByArtist[artist?.id]

    return {
      id: session.id,
      title: session.title,
      slug: session.slug,
      genre: session.genre,
      video_url: session.video_url,
      published_at: session.published_at,
      thumbnail_url: thumbnail?.path ? getS3Url(thumbnail.path) : null,
      artist: {
        id: artist?.id,
        name: artist?.name,
        slug: artist?.slug,
        bio: artist?.bio,
        profile_image: thumbnail?.path ? getS3Url(thumbnail.path) : null,
      },
    }
  })
}

export async function getLiveSessionBySlug(slug: string) {
  const supabase = await createClient()

  const { data: session, error } = await supabase
    .from('live_sessions')
    .select(`
      id,
      title,
      slug,
      genre,
      video_url,
      description,
      published_at,
      created_at,
      updated_at,
      artist_id,
      artist:artists(
        id,
        name,
        slug,
        bio,
        artist_platform_links(
          id,
          url,
          platform:platforms(name, slug, type, icon)
        )
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error

  const artist = Array.isArray(session.artist) ? session.artist[0] : session.artist

  // Get artist images
  const artistImages = await getArtistImages(supabase, artist.id)

  // Get participants
  const { data: participantLinks } = await supabase
    .from('artist_live_session_participant')
    .select('artist_id')
    .eq('live_session_id', session.id)

  const participantIds = (participantLinks || []).map((p: any) => p.artist_id)

  let participants: any[] = []
  if (participantIds.length > 0) {
    const { data: participantArtists } = await supabase
      .from('artists')
      .select(`
        id,
        name,
        slug,
        artist_platform_links(
          id,
          url,
          platform:platforms(name, slug, type, icon)
        )
      `)
      .in('id', participantIds)

    participants = (participantArtists || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      platforms: p.artist_platform_links?.map((link: any) => ({
        name: link.platform.name,
        slug: link.platform.slug,
        icon_url: link.platform.icon ? getS3Url(link.platform.icon) : null,
        url: link.url,
      })) || [],
    }))
  }

  // Transform artist data
  const socialPlatforms = artist.artist_platform_links
    ?.filter((link: any) => link.platform.type === 'social')
    .map((link: any) => ({
      name: link.platform.name,
      slug: link.platform.slug,
      icon_url: link.platform.icon ? getS3Url(link.platform.icon) : null,
      url: link.url,
    })) || []

  const musicPlatforms = artist.artist_platform_links
    ?.filter((link: any) => link.platform.type === 'music')
    .map((link: any) => ({
      name: link.platform.name,
      slug: link.platform.slug,
      icon_url: link.platform.icon ? getS3Url(link.platform.icon) : null,
      url: link.url,
    })) || []

  const profileImage = artistImages.find((img: any) => img.is_profile)
  const thumbnailImage = artistImages.find((img: any) => img.is_thumbnail)

  return {
    id: session.id,
    title: session.title,
    slug: session.slug,
    genre: session.genre,
    video_url: session.video_url,
    description: session.description,
    published_at: session.published_at,
    created_at: session.created_at,
    updated_at: session.updated_at,
    artist: {
      id: artist.id,
      name: artist.name,
      slug: artist.slug,
      bio: artist.bio,
      profile_image: profileImage?.path ? getS3Url(profileImage.path) : null,
      thumbnail_url: thumbnailImage?.path ? getS3Url(thumbnailImage.path) : null,
      platforms: {
        social: socialPlatforms,
        music: musicPlatforms,
      },
    },
    participants,
  }
}

export async function getLatestLiveSessions() {
  const supabase = await createClient()

  const { data: sessions, error } = await supabase
    .from('live_sessions')
    .select(`
      id,
      title,
      slug,
      genre,
      video_url,
      published_at,
      artist_id,
      artist:artists(id, name, slug, bio)
    `)
    .order('published_at', { ascending: false })
    .limit(3)

  if (error) throw error

  // Get thumbnail images for all artists
  const artistIds = sessions.map((s: any) => s.artist_id)
  const { data: thumbnailImages } = await supabase
    .from('images')
    .select('id, path, imageable_id')
    .in('imageable_id', artistIds)
    .eq('imageable_type', 'Artist')
    .eq('is_thumbnail', true)

  const thumbnailByArtist = (thumbnailImages || []).reduce((acc: any, img: any) => {
    acc[img.imageable_id] = img
    return acc
  }, {})

  return sessions.map((session: any) => {
    const artist = Array.isArray(session.artist) ? session.artist[0] : session.artist
    const thumbnail = thumbnailByArtist[artist?.id]

    return {
      id: session.id,
      title: session.title,
      slug: session.slug,
      genre: session.genre,
      video_url: session.video_url,
      published_at: session.published_at,
      thumbnail_url: thumbnail?.path ? getS3Url(thumbnail.path) : null,
      artist: {
        id: artist?.id,
        name: artist?.name,
        slug: artist?.slug,
        bio: artist?.bio,
        profile_image: thumbnail?.path ? getS3Url(thumbnail.path) : null,
      },
    }
  })
}
