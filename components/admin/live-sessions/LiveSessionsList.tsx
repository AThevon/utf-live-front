'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
} from '@heroui/react'
import { Plus, Pencil, Search } from 'lucide-react'
import PageHeader from '../PageHeader'

interface LiveSession {
  id: number
  title: string
  slug: string
  genre: string
  video_url: string
  published_at: string
  created_at: string
  artist: {
    id: number
    name: string
    slug: string
  }
}

interface LiveSessionsListProps {
  sessions: LiveSession[]
}

export default function LiveSessionsList({ sessions }: LiveSessionsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getYoutubeThumbnail = (url: string) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
    }
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Live Sessions"
        description={`${filteredSessions.length} session${filteredSessions.length > 1 ? 's' : ''}`}
        backHref="/admin"
        actions={
          <Button
            as={Link}
            href="/admin/live-sessions/new"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            startContent={<Plus className="w-4 h-4" />}
          >
            Nouvelle session
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Rechercher une session ou un artiste..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="w-4 h-4 text-zinc-400" />}
          classNames={{
            inputWrapper: 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700',
            input: 'text-white placeholder:text-zinc-500',
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <Table
          aria-label="Liste des live sessions"
          classNames={{
            wrapper: 'bg-transparent shadow-none',
            th: 'bg-zinc-800/50 text-zinc-400 font-medium',
            td: 'text-zinc-300',
          }}
        >
          <TableHeader>
            <TableColumn>SESSION</TableColumn>
            <TableColumn>ARTISTE</TableColumn>
            <TableColumn>GENRE</TableColumn>
            <TableColumn>PUBLIÉE LE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Aucune session trouvée">
            {filteredSessions.map((session) => (
              <TableRow key={session.id} className="hover:bg-zinc-800/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getYoutubeThumbnail(session.video_url) && (
                      <img
                        src={getYoutubeThumbnail(session.video_url)!}
                        alt={session.title}
                        className="w-24 h-14 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-white">{session.title}</p>
                      <code className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                        {session.slug}
                      </code>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/artists/${session.artist.slug}/edit`}
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    {session.artist.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    {session.genre}
                  </Chip>
                </TableCell>
                <TableCell className="text-zinc-400">
                  {new Date(session.published_at).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    href={`/admin/live-sessions/${session.slug}/edit`}
                    size="sm"
                    variant="flat"
                    className="bg-zinc-800 hover:bg-zinc-700"
                    startContent={<Pencil className="w-3 h-3" />}
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
