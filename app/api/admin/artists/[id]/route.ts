import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const artistSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  bio: z.string().optional().nullable(),
})

// Update artist
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = artistSchema.parse(body)

    // Check if slug exists (excluding current artist)
    const { data: existing } = await supabase
      .from('artists')
      .select('id')
      .eq('slug', validated.slug)
      .neq('id', id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const { data: artist, error } = await supabase
      .from('artists')
      .update(validated)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update artist:', error)
      return NextResponse.json(
        { error: 'Failed to update artist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ artist })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Artist update error:', error)
    return NextResponse.json(
      { error: 'Failed to update artist' },
      { status: 500 }
    )
  }
}

// Delete artist
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get artist images to delete from S3
    const { data: images } = await supabase
      .from('images')
      .select('path')
      .eq('imageable_id', id)
      .eq('imageable_type', 'Artist')

    // Delete artist (cascade will delete images from DB)
    const { error } = await supabase.from('artists').delete().eq('id', id)

    if (error) {
      console.error('Failed to delete artist:', error)
      return NextResponse.json(
        { error: 'Failed to delete artist' },
        { status: 500 }
      )
    }

    // Delete images from S3
    if (images && images.length > 0) {
      const { deleteFromS3 } = await import('@/lib/s3/upload')
      await Promise.all(images.map((img) => deleteFromS3(img.path)))
    }

    return NextResponse.json({ message: 'Artist deleted successfully' })
  } catch (error) {
    console.error('Artist deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete artist' },
      { status: 500 }
    )
  }
}
