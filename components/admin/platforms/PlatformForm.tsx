'use client'

import { useState, useEffect } from 'react'
import {
  Input,
  Button,
  Select,
  SelectItem,
  Image,
} from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload } from 'lucide-react'

const platformSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(50),
  slug: z.string().min(1, 'Le slug est requis').max(50),
  type: z.enum(['social', 'music'], { error: 'Le type est requis' }),
})

type PlatformFormData = z.infer<typeof platformSchema>

interface Platform {
  id: number
  name: string
  slug: string
  type: 'social' | 'music'
  icon: string | null
  icon_url: string | null
}

interface PlatformFormProps {
  platform?: Platform | null
  onSuccess: () => void
  onCancel: () => void
}

export default function PlatformForm({
  platform,
  onSuccess,
  onCancel,
}: PlatformFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(
    platform?.icon_url || null
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlatformFormData>({
    resolver: zodResolver(platformSchema),
    defaultValues: {
      name: platform?.name || '',
      slug: platform?.slug || '',
      type: platform?.type || 'social',
    },
  })

  const name = watch('name')

  // Auto-generate slug from name
  useEffect(() => {
    if (!platform && name) {
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [name, platform, setValue])

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: PlatformFormData) => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('slug', data.slug)
      formData.append('type', data.type)
      if (iconFile) {
        formData.append('icon', iconFile)
      }

      const url = platform
        ? `/api/admin/platforms/${platform.id}`
        : '/api/admin/platforms'
      const method = platform ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save platform')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-danger-50 text-danger p-4 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nom"
          placeholder="Ex: Instagram"
          {...register('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          isDisabled={loading}
          isRequired
        />

        <Input
          label="Slug"
          placeholder="instagram"
          {...register('slug')}
          isInvalid={!!errors.slug}
          errorMessage={errors.slug?.message}
          isDisabled={loading || !platform}
          isRequired
        />
      </div>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            label="Type de plateforme"
            placeholder="Choisir un type"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as 'social' | 'music'
              field.onChange(selected)
            }}
            isInvalid={!!errors.type}
            errorMessage={errors.type?.message}
            isDisabled={loading}
            isRequired
          >
            <SelectItem key="social">Réseau social</SelectItem>
            <SelectItem key="music">Plateforme musicale</SelectItem>
          </Select>
        )}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Icône (SVG recommandé)</label>
        <div className="flex items-center gap-4">
          {iconPreview && (
            <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-default-50">
              <Image
                src={iconPreview}
                alt="Preview"
                className="w-12 h-12 object-contain"
                removeWrapper
              />
            </div>
          )}
          <div>
            <input
              type="file"
              id="icon-upload"
              accept=".svg,image/svg+xml,image/png,image/jpeg"
              onChange={handleIconChange}
              disabled={loading}
              className="hidden"
            />
            <Button
              as="label"
              htmlFor="icon-upload"
              variant="bordered"
              startContent={<Upload className="w-4 h-4" />}
              isDisabled={loading}
            >
              {iconPreview ? "Changer l'icône" : 'Uploader une icône'}
            </Button>
            <p className="text-xs text-default-400 mt-1">
              SVG, PNG ou JPG. Le fichier sera uploadé sur S3.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <Button variant="flat" onPress={onCancel} isDisabled={loading}>
          Annuler
        </Button>
        <Button type="submit" color="primary" variant="bordered" isLoading={loading}>
          {platform ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  )
}
