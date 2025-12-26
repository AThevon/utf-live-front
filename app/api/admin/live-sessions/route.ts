import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const liveSessionSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  genre: z.string().min(1).max(255),
  artist_id: z.number().int().positive(),
  video_url: z.string().url(),
  published_at: z.string(), // date string
  description: z.string().optional().nullable(),
  participant_ids: z.array(z.number().int().positive()).optional(),
})

// GET all live sessions for admin list
export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: sessions, error } = await supabase
      .from('live_sessions')
      .select(
        `
        id,
        title,
        slug,
        genre,
        video_url,
        published_at,
        created_at,
        artist:artists(id, name, slug)
      `
      )
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch live sessions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch live sessions' },
        { status: 500 }
      )
    }

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Live sessions fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live sessions' },
      { status: 500 }
    )
  }
}

// Create live session
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = liveSessionSchema.parse(body)

    // Check if slug exists
    const { data: existing } = await supabase
      .from('live_sessions')
      .select('id')
      .eq('slug', validated.slug)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Extract participant_ids before insert
    const { participant_ids, ...sessionData } = validated

    const { data: session, error } = await supabase
      .from('live_sessions')
      .insert(sessionData)
      .select()
      .single()

    if (error) {
      console.error('Failed to create live session:', error)
      return NextResponse.json(
        { error: 'Failed to create live session' },
        { status: 500 }
      )
    }

    // Add participants if any
    if (participant_ids && participant_ids.length > 0) {
      const participantRecords = participant_ids.map((artist_id) => ({
        artist_id,
        live_session_id: session.id,
      }))

      const { error: participantError } = await supabase
        .from('artist_live_session_participant')
        .insert(participantRecords)

      if (participantError) {
        console.error('Failed to add participants:', participantError)
      }
    }

    return NextResponse.json({ session }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Live session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create live session' },
      { status: 500 }
    )
  }
}
