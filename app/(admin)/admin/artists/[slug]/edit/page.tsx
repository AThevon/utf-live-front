import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import ArtistEditForm from '@/components/admin/artists/ArtistEditForm'
import PageHeader from '@/components/admin/PageHeader'

export default async function EditArtistPage({
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

  // Fetch artist
  const { data: artist, error } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !artist) {
    notFound()
  }

  // Fetch images separately
  const { data: images } = await supabase
    .from('images')
    .select('id, path, alt, is_profile, is_thumbnail, created_at')
    .eq('imageable_id', artist.id)
    .eq('imageable_type', 'Artist')
    .order('created_at', { ascending: false })

  const artistWithImages = { ...artist, images: images || [] }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={`Modifier ${artist.name}`}
        description="Modifier les informations de l'artiste"
        backHref="/admin/artists"
      />
      <ArtistEditForm artist={artistWithImages} />
    </div>
  )
}
