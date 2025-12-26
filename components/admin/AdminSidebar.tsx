'use client'

import { useState, memo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button, Avatar, Tooltip } from '@heroui/react'
import {
  LayoutDashboard,
  Users,
  Video,
  Link2,
  LogOut,
  ExternalLink,
  Menu,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface AdminSidebarProps {
  user: User
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Artistes', href: '/admin/artists', icon: Users },
  { label: 'Live Sessions', href: '/admin/live-sessions', icon: Video },
  { label: 'Plateformes', href: '/admin/platforms', icon: Link2 },
]

function AdminSidebar({ user }: AdminSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/utf-logo.png"
              alt="UTF Live"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold text-white">UTF Admin</span>
          </Link>
          <div className="w-10" />
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50
          w-64 h-screen bg-zinc-900 border-r border-zinc-800
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-zinc-800">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/utf-logo.png"
                alt="UTF Live"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h1 className="font-semibold text-white">UTF Live</h1>
                <p className="text-xs text-zinc-500">Administration</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white border border-violet-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-violet-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/30">
              <Avatar
                name={user.email?.charAt(0).toUpperCase()}
                size="sm"
                className="bg-gradient-to-br from-violet-500 to-fuchsia-500"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email?.split('@')[0]}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Tooltip content="Voir le site">
                <Button
                  as={Link}
                  href="/"
                  target="_blank"
                  isIconOnly
                  variant="flat"
                  className="flex-1 bg-zinc-800/50 hover:bg-zinc-800"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Button
                variant="flat"
                className="flex-1 bg-zinc-800/50 hover:bg-red-500/20 hover:text-red-400"
                onPress={handleLogout}
                isLoading={loading}
                startContent={!loading && <LogOut className="w-4 h-4" />}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default memo(AdminSidebar)
