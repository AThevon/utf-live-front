'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Image,
  Switch,
  Spinner,
} from '@heroui/react'
import { Upload, Trash2, ImageIcon } from 'lucide-react'
import ArtistForm from './ArtistForm'

interface ArtistImage {
  id: number
  path: string
  alt: string | null
  is_profile: boolean
  is_thumbnail: boolean
  created_at: string
}

interface Artist {
  id: number
  name: string
  slug: string
  bio: string | null
  images: ArtistImage[]
}

interface ArtistEditFormProps {
  artist: Artist
}

export default function ArtistEditForm({ artist }: ArtistEditFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<ArtistImage[]>(artist.images || [])
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch(`/api/admin/artists/${artist.id}/images`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setImages([...images, ...data.images])
      router.refresh()
    } catch (error) {
      console.error('Upload error:', error)
      alert("Échec de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const handleToggle = async (
    imageId: number,
    field: 'is_profile' | 'is_thumbnail',
    value: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/artists/${artist.id}/images`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageId,
          [field]: value,
        }),
      })

      if (!response.ok) {
        throw new Error('Update failed')
      }

      // Update local state
      setImages(
        images.map((img) =>
          img.id === imageId
            ? { ...img, [field]: value }
            : field === 'is_profile' && value
              ? { ...img, is_profile: false }
              : field === 'is_thumbnail' && value
                ? { ...img, is_thumbnail: false }
                : img
        )
      )

      router.refresh()
    } catch (error) {
      console.error('Toggle error:', error)
      alert('Échec de la mise à jour')
    }
  }

  const handleDelete = async (imageId: number) => {
    if (!confirm('Supprimer cette image ?')) return

    try {
      const response = await fetch(
        `/api/admin/artists/${artist.id}/images?imageId=${imageId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setImages(images.filter((img) => img.id !== imageId))
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Échec de la suppression')
    }
  }

  return (
    <div className="space-y-8">
      {/* Artist Info Form */}
      <ArtistForm
        artistId={artist.id.toString()}
        initialData={{
          name: artist.name,
          slug: artist.slug,
          bio: artist.bio || '',
        }}
      />

      {/* Images Gallery */}
      <Card className="bg-zinc-900/50 border border-zinc-800">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <ImageIcon className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Images</h2>
              <p className="text-sm text-zinc-400">
                {images.length} image{images.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <Button
              as="label"
              htmlFor="image-upload"
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer"
              isDisabled={uploading}
              startContent={<Upload className="w-4 h-4" />}
            >
              {uploading ? 'Upload...' : 'Uploader'}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          {uploading && (
            <div className="mb-4 flex items-center gap-3 p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
              <Spinner size="sm" color="secondary" />
              <span className="text-sm text-violet-300">Upload en cours...</span>
            </div>
          )}

          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
              <ImageIcon className="w-12 h-12 mx-auto text-zinc-600 mb-3" />
              <p className="text-zinc-500">Aucune image</p>
              <p className="text-zinc-600 text-sm">
                Uploadez des images pour commencer
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${image.path}`}
                    alt={image.alt || ''}
                    className="w-full h-48 object-cover"
                    removeWrapper
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between z-10">
                    <div className="space-y-3">
                      <Switch
                        size="sm"
                        isSelected={image.is_profile}
                        onValueChange={(val) =>
                          handleToggle(image.id, 'is_profile', val)
                        }
                        classNames={{
                          wrapper:
                            'bg-zinc-700 group-data-[selected=true]:bg-violet-500',
                        }}
                      >
                        <span className="text-white text-xs">Profil</span>
                      </Switch>
                      <Switch
                        size="sm"
                        isSelected={image.is_thumbnail}
                        onValueChange={(val) =>
                          handleToggle(image.id, 'is_thumbnail', val)
                        }
                        classNames={{
                          wrapper:
                            'bg-zinc-700 group-data-[selected=true]:bg-violet-500',
                        }}
                      >
                        <span className="text-white text-xs">Vignette</span>
                      </Switch>
                    </div>
                    <Button
                      size="sm"
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      startContent={<Trash2 className="w-3 h-3" />}
                      onPress={() => handleDelete(image.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
