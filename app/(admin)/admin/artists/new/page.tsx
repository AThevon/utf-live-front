import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ArtistForm from '@/components/admin/artists/ArtistForm'
import PageHeader from '@/components/admin/PageHeader'

export default async function NewArtistPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Nouvel artiste"
        description="Créer un nouvel artiste"
        backHref="/admin/artists"
      />
      <ArtistForm />
    </div>
  )
}
