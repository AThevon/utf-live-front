import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LiveSessionForm from '@/components/admin/live-sessions/LiveSessionForm'
import PageHeader from '@/components/admin/PageHeader'

function getS3Url(path: string): string {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${path}`
}

export default async function NewLiveSessionPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

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

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Nouvelle live session"
        description="Créer une nouvelle session"
        backHref="/admin/live-sessions"
      />
      <LiveSessionForm artists={artistsForSelect} />
    </div>
  )
}
