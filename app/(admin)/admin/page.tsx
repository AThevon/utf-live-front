import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch stats
  const [
    { count: artistsCount },
    { count: sessionsCount },
    { count: platformsCount },
  ] = await Promise.all([
    supabase.from('artists').select('*', { count: 'exact', head: true }),
    supabase.from('live_sessions').select('*', { count: 'exact', head: true }),
    supabase.from('platforms').select('*', { count: 'exact', head: true }),
  ])

  return (
    <AdminDashboard
      stats={{
        artistsCount: artistsCount || 0,
        sessionsCount: sessionsCount || 0,
        platformsCount: platformsCount || 0,
      }}
    />
  )
}
