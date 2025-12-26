'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
  Chip,
} from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const liveSessionSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255),
  slug: z.string().min(1, 'Le slug est requis').max(255),
  genre: z.string().min(1, 'Le genre est requis').max(255),
  artist_id: z.number().int().positive("L'artiste est requis"),
  video_url: z.string().url('URL invalide'),
  published_at: z.string().min(1, 'La date est requise'),
  description: z.string().optional(),
  participant_ids: z.array(z.number().int().positive()).optional(),
})

type LiveSessionFormData = z.infer<typeof liveSessionSchema>

interface Artist {
  id: number
  name: string
  slug: string
  profile_image: string | null
}

interface LiveSessionFormProps {
  sessionId?: number
  initialData?: Partial<LiveSessionFormData>
  artists: Artist[]
}

export default function LiveSessionForm({
  sessionId,
  initialData,
  artists,
}: LiveSessionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [autoSlug, setAutoSlug] = useState(!sessionId)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<LiveSessionFormData>({
    resolver: zodResolver(liveSessionSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      genre: '',
      video_url: '',
      published_at: new Date().toISOString().split('T')[0],
      description: '',
      participant_ids: [],
    },
  })

  const title = watch('title')
  const videoUrl = watch('video_url')
  const artistId = watch('artist_id')

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [title, autoSlug, setValue])

  // Normalize YouTube URL to embed format
  useEffect(() => {
    if (videoUrl) {
      const match = videoUrl.match(/(?:v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
      if (match && !videoUrl.includes('/embed/')) {
        setValue('video_url', `https://www.youtube.com/embed/${match[1]}`)
      }
    }
  }, [videoUrl, setValue])

  const getYoutubeThumbnail = (url: string) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
    }
    return null
  }

  const onSubmit = async (data: LiveSessionFormData) => {
    setLoading(true)
    setError(null)

    try {
      const url = sessionId
        ? `/api/admin/live-sessions/${sessionId}`
        : '/api/admin/live-sessions'
      const method = sessionId ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save live session')
      }

      const { session } = await response.json()

      router.push('/admin/live-sessions')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  // Filter out selected main artist from participants
  const availableParticipants = artists.filter((a) => a.id !== artistId)

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-danger-50 text-danger p-4 rounded-lg">{error}</div>
          )}

          {/* Title and Slug */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Input
                label="Titre"
                placeholder="Ex: Vent et marée"
                {...register('title')}
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                isDisabled={loading}
                isRequired
              />
            </div>
            <div className="col-span-5">
              <Input
                label="Slug (URL)"
                placeholder="vent-et-maree"
                {...register('slug')}
                isInvalid={!!errors.slug}
                errorMessage={errors.slug?.message}
                isDisabled={loading || autoSlug}
                isRequired
              />
            </div>
            <div className="col-span-1 flex items-end pb-1">
              <Switch
                isSelected={autoSlug}
                onValueChange={setAutoSlug}
                isDisabled={loading}
                size="sm"
              >
                Auto
              </Switch>
            </div>
          </div>

          {/* Artist and Participants */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="artist_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Artiste principal"
                  placeholder="Choisir un artiste"
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0]
                    field.onChange(selected ? Number(selected) : undefined)
                  }}
                  isInvalid={!!errors.artist_id}
                  errorMessage={errors.artist_id?.message}
                  isDisabled={loading}
                  isRequired
                >
                  {artists.map((artist) => (
                    <SelectItem key={String(artist.id)} textValue={artist.name}>
                      <div className="flex items-center gap-2">
                        {artist.profile_image ? (
                          <img
                            src={artist.profile_image}
                            alt={artist.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-default-200" />
                        )}
                        <span>{artist.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="participant_ids"
              control={control}
              render={({ field }) => (
                <Select
                  label="Participants (optionnel)"
                  placeholder="Ajouter des participants"
                  selectionMode="multiple"
                  selectedKeys={
                    field.value ? field.value.map((id) => String(id)) : []
                  }
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys).map(Number)
                    field.onChange(selected)
                  }}
                  isDisabled={loading}
                >
                  {availableParticipants.map((artist) => (
                    <SelectItem key={String(artist.id)} textValue={artist.name}>
                      <div className="flex items-center gap-2">
                        {artist.profile_image ? (
                          <img
                            src={artist.profile_image}
                            alt={artist.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-default-200" />
                        )}
                        <span>{artist.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Video URL, Genre, Date */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Input
                label="URL de la vidéo"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register('video_url')}
                isInvalid={!!errors.video_url}
                errorMessage={errors.video_url?.message}
                isDisabled={loading}
                isRequired
              />
            </div>
            <div className="col-span-3">
              <Input
                label="Genre"
                placeholder="Rap FR"
                {...register('genre')}
                isInvalid={!!errors.genre}
                errorMessage={errors.genre?.message}
                isDisabled={loading}
                isRequired
              />
            </div>
            <div className="col-span-3">
              <Input
                type="date"
                label="Date de publication"
                {...register('published_at')}
                isInvalid={!!errors.published_at}
                errorMessage={errors.published_at?.message}
                isDisabled={loading}
                isRequired
              />
            </div>
          </div>

          {/* Video Preview */}
          {videoUrl && getYoutubeThumbnail(videoUrl) && (
            <div className="flex items-center gap-4 p-4 bg-default-50 rounded-lg">
              <img
                src={getYoutubeThumbnail(videoUrl)!}
                alt="Aperçu vidéo"
                className="w-32 h-20 object-cover rounded"
              />
              <div className="text-sm text-default-500">
                <p>Aperçu de la miniature YouTube</p>
                <code className="text-xs">{videoUrl}</code>
              </div>
            </div>
          )}

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Description de la session..."
            {...register('description')}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            isDisabled={loading}
            minRows={6}
          />

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="flat"
              onPress={() => router.back()}
              isDisabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" color="primary" variant="bordered" isLoading={loading}>
              {sessionId ? 'Mettre à jour' : 'Créer la session'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
