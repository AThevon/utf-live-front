'use client'

import Link from 'next/link'
import { Card, CardBody, Button } from '@heroui/react'
import {
  Users,
  Video,
  Link2,
  Plus,
  Eye,
} from 'lucide-react'
import PageHeader from './PageHeader'

interface Stats {
  artistsCount: number
  sessionsCount: number
  platformsCount: number
}

interface AdminDashboardProps {
  stats: Stats
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const quickLinks = [
    {
      label: 'Artistes',
      description: 'Gérer les artistes et leurs photos',
      href: '/admin/artists',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      count: stats.artistsCount,
    },
    {
      label: 'Live Sessions',
      description: 'Gérer les sessions et vidéos',
      href: '/admin/live-sessions',
      icon: Video,
      color: 'from-violet-500 to-fuchsia-500',
      count: stats.sessionsCount,
    },
    {
      label: 'Plateformes',
      description: 'Réseaux sociaux et streaming',
      href: '/admin/platforms',
      icon: Link2,
      color: 'from-orange-500 to-rose-500',
      count: stats.platformsCount,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Dashboard"
        description="Bienvenue dans l'administration UTF Live"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {item.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </CardBody>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-zinc-900/50 border border-zinc-800">
        <CardBody className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-violet-400" />
            Actions rapides
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              href="/admin/artists/new"
              variant="flat"
              className="bg-zinc-800 hover:bg-zinc-700"
              startContent={<Users className="w-4 h-4" />}
            >
              Nouvel artiste
            </Button>
            <Button
              as={Link}
              href="/admin/live-sessions/new"
              variant="flat"
              className="bg-zinc-800 hover:bg-zinc-700"
              startContent={<Video className="w-4 h-4" />}
            >
              Nouvelle session
            </Button>
            <Button
              as={Link}
              href="/"
              target="_blank"
              variant="flat"
              className="bg-zinc-800 hover:bg-zinc-700"
              startContent={<Eye className="w-4 h-4" />}
            >
              Voir le site
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
