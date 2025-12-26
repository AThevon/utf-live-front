import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const platformLinkSchema = z.object({
  platform_id: z.number(),
  url: z.string().url(),
})

// Create platform link
export async function POST(
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
    const validated = platformLinkSchema.parse(body)

    // Check if link already exists for this artist/platform combo
    const { data: existing } = await supabase
      .from('artist_platform_links')
      .select('id')
      .eq('artist_id', id)
      .eq('platform_id', validated.platform_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Platform link already exists' },
        { status: 400 }
      )
    }

    const { data: link, error } = await supabase
      .from('artist_platform_links')
      .insert({
        artist_id: parseInt(id),
        ...validated,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create platform link:', error)
      return NextResponse.json(
        { error: 'Failed to create platform link' },
        { status: 500 }
      )
    }

    return NextResponse.json({ link }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Platform link creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create platform link' },
      { status: 500 }
    )
  }
}

// Delete platform link
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

    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('linkId')

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('artist_platform_links')
      .delete()
      .eq('id', linkId)
      .eq('artist_id', id)

    if (error) {
      console.error('Failed to delete platform link:', error)
      return NextResponse.json(
        { error: 'Failed to delete platform link' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Platform link deleted' })
  } catch (error) {
    console.error('Platform link deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete platform link' },
      { status: 500 }
    )
  }
}
