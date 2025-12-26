import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <AdminSidebar user={user} />

      {/* Main content */}
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
