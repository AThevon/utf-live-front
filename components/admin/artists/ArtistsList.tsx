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
  Avatar,
  Chip,
} from '@heroui/react'
import { Plus, Pencil, Search } from 'lucide-react'
import PageHeader from '../PageHeader'

interface Artist {
  id: number
  name: string
  slug: string
  bio: string | null
  created_at: string
  updated_at: string
  images: Array<{
    id: number
    path: string
    alt: string | null
    is_profile: boolean
  }>
}

interface ArtistsListProps {
  artists: Artist[]
}

export default function ArtistsList({ artists }: ArtistsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getProfileImage = (artist: Artist) => {
    const profileImage = artist.images?.find((img) => img.is_profile)
    return profileImage
      ? `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${profileImage.path}`
      : undefined
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Artistes"
        description={`${filteredArtists.length} artiste${filteredArtists.length > 1 ? 's' : ''}`}
        backHref="/admin"
        actions={
          <Button
            as={Link}
            href="/admin/artists/new"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            startContent={<Plus className="w-4 h-4" />}
          >
            Nouvel artiste
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Rechercher un artiste..."
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
          aria-label="Liste des artistes"
          classNames={{
            wrapper: 'bg-transparent shadow-none',
            th: 'bg-zinc-800/50 text-zinc-400 font-medium',
            td: 'text-zinc-300',
          }}
        >
          <TableHeader>
            <TableColumn>ARTISTE</TableColumn>
            <TableColumn>SLUG</TableColumn>
            <TableColumn>IMAGES</TableColumn>
            <TableColumn>CRÉÉ LE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Aucun artiste trouvé">
            {filteredArtists.map((artist) => (
              <TableRow key={artist.id} className="hover:bg-zinc-800/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={getProfileImage(artist)}
                      name={artist.name}
                      size="md"
                      className="bg-gradient-to-br from-violet-500 to-fuchsia-500"
                    />
                    <div>
                      <p className="font-semibold text-white">{artist.name}</p>
                      {artist.bio && (
                        <p className="text-sm text-zinc-500 line-clamp-1 max-w-[200px]">
                          {artist.bio.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-sm text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                    {artist.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    {artist.images?.length || 0} image{(artist.images?.length || 0) > 1 ? 's' : ''}
                  </Chip>
                </TableCell>
                <TableCell className="text-zinc-400">
                  {new Date(artist.created_at).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    href={`/admin/artists/${artist.slug}/edit`}
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
