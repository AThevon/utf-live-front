import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import LiveSessionForm from '@/components/admin/live-sessions/LiveSessionForm'
import PageHeader from '@/components/admin/PageHeader'

function getS3Url(path: string): string {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${path}`
}

export default async function EditLiveSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch live session by slug
  const { data: session, error } = await supabase
    .from('live_sessions')
    .select(
      `
      id,
      title,
      slug,
      genre,
      video_url,
      description,
      published_at,
      artist_id
    `
    )
    .eq('slug', slug)
    .single()

  if (error || !session) {
    notFound()
  }

  // Fetch participants
  const { data: participants } = await supabase
    .from('artist_live_session_participant')
    .select('artist_id')
    .eq('live_session_id', session.id)

  // Fetch all artists for the select dropdown
  const { data: artists } = await supabase
    .from('artists')
    .select('id, name, slug')
    .order('name', { ascending: true })

  // Fetch profile images for all artists separately (polymorphic relation)
  const artistIds = artists?.map((a: any) => a.id) || []
  const { data: profileImages } = await supabase
    .from('images')
    .select('imageable_id, path')
    .in('imageable_id', artistIds)
    .eq('imageable_type', 'Artist')
    .eq('is_profile', true)

  const profileImageByArtist = (profileImages || []).reduce((acc: any, img: any) => {
    acc[img.imageable_id] = img.path
    return acc
  }, {})

  // Transform artists with profile image
  const artistsForSelect =
    artists?.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      slug: artist.slug,
      profile_image: profileImageByArtist[artist.id]
        ? getS3Url(profileImageByArtist[artist.id])
        : null,
    })) || []

  const initialData = {
    title: session.title,
    slug: session.slug,
    genre: session.genre,
    video_url: session.video_url,
    description: session.description || '',
    published_at: session.published_at,
    artist_id: session.artist_id,
    participant_ids: participants?.map((p) => p.artist_id) || [],
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={`Modifier "${session.title}"`}
        description="Modifier les informations de la session"
        backHref="/admin/live-sessions"
      />
      <LiveSessionForm
        sessionId={session.id}
        initialData={initialData}
        artists={artistsForSelect}
      />
    </div>
  )
}
