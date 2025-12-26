'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@heroui/react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PlatformForm from './PlatformForm'
import PageHeader from '../PageHeader'

interface Platform {
  id: number
  name: string
  slug: string
  type: 'social' | 'music'
  icon: string | null
  icon_url: string | null
}

interface PlatformsListProps {
  platforms: Platform[]
}

export default function PlatformsList({ platforms }: PlatformsListProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleCreate = () => {
    setEditingPlatform(null)
    onOpen()
  }

  const handleEdit = (platform: Platform) => {
    setEditingPlatform(platform)
    onOpen()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette plateforme ?')) return

    setDeleting(id)
    try {
      const response = await fetch(`/api/admin/platforms/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  const handleFormSuccess = () => {
    onClose()
    router.refresh()
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Plateformes"
          description="Gérez les réseaux sociaux et plateformes musicales"
          backHref="/admin"
          actions={
            <Button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
              startContent={<Plus className="w-4 h-4" />}
              onPress={handleCreate}
            >
              Ajouter une plateforme
            </Button>
          }
        />

        {/* Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <Table
            aria-label="Liste des plateformes"
            classNames={{
              wrapper: 'bg-transparent shadow-none',
              th: 'bg-zinc-800/50 text-zinc-400 font-medium',
              td: 'text-zinc-300',
            }}
          >
            <TableHeader>
              <TableColumn width={80}>Icône</TableColumn>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Slug</TableColumn>
              <TableColumn width={150}>Type</TableColumn>
              <TableColumn width={150}>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Aucune plateforme">
              {platforms.map((platform) => (
                <TableRow key={platform.id} className="hover:bg-zinc-800/30 transition-colors">
                  <TableCell>
                    {platform.icon_url ? (
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center p-2">
                        <Image
                          src={platform.icon_url}
                          alt={platform.name}
                          className="w-full h-full object-contain"
                          removeWrapper
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                        ?
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white">{platform.name}</TableCell>
                  <TableCell>
                    <code className="text-sm text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                      {platform.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      className={
                        platform.type === 'music'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }
                    >
                      {platform.type === 'music' ? 'Musique' : 'Social'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="bg-zinc-800 hover:bg-zinc-700"
                        onPress={() => handleEdit(platform)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="bg-zinc-800 hover:bg-red-500/20 hover:text-red-400"
                        isLoading={deleting === platform.id}
                        onPress={() => handleDelete(platform.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        classNames={{
          base: 'bg-zinc-900 border border-zinc-800',
          header: 'border-b border-zinc-800',
          body: 'py-6',
        }}
      >
        <ModalContent>
          <ModalHeader className="text-white">
            {editingPlatform ? 'Modifier la plateforme' : 'Nouvelle plateforme'}
          </ModalHeader>
          <ModalBody>
            <PlatformForm
              platform={editingPlatform}
              onSuccess={handleFormSuccess}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
