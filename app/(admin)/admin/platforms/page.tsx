import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PlatformsList from '@/components/admin/platforms/PlatformsList'

function getS3Url(path: string): string {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${path}`
}

export default async function PlatformsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: platforms, error } = await supabase
    .from('platforms')
    .select('*')
    .order('type', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching platforms:', error)
  }

  const platformsWithUrls = (platforms || []).map((platform: any) => ({
    ...platform,
    icon_url: platform.icon ? getS3Url(platform.icon) : null,
  }))

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <PlatformsList platforms={platformsWithUrls} />
      </div>
    </div>
  )
}
