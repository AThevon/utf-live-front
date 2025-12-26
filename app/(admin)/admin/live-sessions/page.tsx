import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LiveSessionsList from '@/components/admin/live-sessions/LiveSessionsList'

export default async function AdminLiveSessionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all live sessions with artist info
  const { data: sessions, error } = await supabase
    .from('live_sessions')
    .select(
      `
      id,
      title,
      slug,
      genre,
      video_url,
      published_at,
      created_at,
      artist:artists(id, name, slug)
    `
    )
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching live sessions:', error)
  }

  // Transform sessions to flatten artist object
  const transformedSessions = (sessions || []).map((session: any) => ({
    ...session,
    artist: Array.isArray(session.artist) ? session.artist[0] : session.artist,
  }))

  return <LiveSessionsList sessions={transformedSessions} />
}
