import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ArtistsList from '@/components/admin/artists/ArtistsList'

export default async function AdminArtistsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all artists
  const { data: artists, error } = await supabase
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching artists:', error)
  }

  // Fetch images separately for each artist
  const artistsWithImages = await Promise.all(
    (artists || []).map(async (artist) => {
      const { data: images } = await supabase
        .from('images')
        .select('id, path, alt, is_profile')
        .eq('imageable_id', artist.id)
        .eq('imageable_type', 'Artist')

      return { ...artist, images: images || [] }
    })
  )

  return <ArtistsList artists={artistsWithImages || []} />
}
