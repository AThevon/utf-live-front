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
} from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const artistSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(255),
  slug: z.string().min(1, 'Le slug est requis').max(255),
  bio: z.string().optional(),
})

type ArtistFormData = z.infer<typeof artistSchema>

interface ArtistFormProps {
  artistId?: string
  initialData?: Partial<ArtistFormData>
}

export default function ArtistForm({ artistId, initialData }: ArtistFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [autoSlug, setAutoSlug] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      bio: '',
    },
  })

  const name = watch('name')

  // Auto-generate slug from name
  useEffect(() => {
    if (autoSlug && name) {
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [name, autoSlug, setValue])

  const onSubmit = async (data: ArtistFormData) => {
    setLoading(true)
    setError(null)

    try {
      const url = artistId
        ? `/api/admin/artists/${artistId}`
        : '/api/admin/artists'
      const method = artistId ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save artist')
      }

      const { artist } = await response.json()

      // Redirect to edit page with images
      router.push(`/admin/artists/${artist.id}/edit`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const inputClassNames = {
    inputWrapper: 'bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus-within:!border-violet-500',
    input: 'text-white placeholder:text-zinc-500',
    label: 'text-zinc-300',
  }

  return (
    <Card className="bg-zinc-900/50 border border-zinc-800">
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Nom de l'artiste"
            placeholder="Ex: Orelsan"
            {...register('name')}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            isDisabled={loading}
            isRequired
            classNames={inputClassNames}
          />

          <div className="flex gap-4 items-end">
            <Input
              label="Slug (URL)"
              placeholder="ex-orelsan"
              {...register('slug')}
              isInvalid={!!errors.slug}
              errorMessage={errors.slug?.message}
              isDisabled={loading || autoSlug}
              isRequired
              className="flex-1"
              classNames={inputClassNames}
            />
            <Switch
              isSelected={autoSlug}
              onValueChange={setAutoSlug}
              isDisabled={loading}
              classNames={{
                wrapper: 'bg-zinc-700 group-data-[selected=true]:bg-violet-500',
              }}
            >
              <span className="text-zinc-300 text-sm">Auto</span>
            </Switch>
          </div>

          <Textarea
            label="Biographie"
            placeholder="Parlez-nous de l'artiste..."
            {...register('bio')}
            isInvalid={!!errors.bio}
            errorMessage={errors.bio?.message}
            isDisabled={loading}
            minRows={8}
            classNames={inputClassNames}
          />

          <div className="flex gap-4 justify-end pt-4">
            <Button
              variant="flat"
              className="bg-zinc-800 hover:bg-zinc-700"
              onPress={() => router.back()}
              isDisabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
              isLoading={loading}
            >
              {artistId ? 'Mettre à jour' : "Créer l'artiste"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
