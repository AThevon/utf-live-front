import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const artistSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  bio: z.string().optional().nullable(),
})

// Create artist
export async function POST(request: Request) {
  try {
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

    // Check if slug exists
    const { data: existing } = await supabase
      .from('artists')
      .select('id')
      .eq('slug', validated.slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const { data: artist, error } = await supabase
      .from('artists')
      .insert(validated)
      .select()
      .single()

    if (error) {
      console.error('Failed to create artist:', error)
      return NextResponse.json(
        { error: 'Failed to create artist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ artist }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Artist creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create artist' },
      { status: 500 }
    )
  }
}
