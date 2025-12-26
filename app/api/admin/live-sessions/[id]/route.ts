import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  genre: z.string().min(1).max(255).optional(),
  artist_id: z.number().int().positive().optional(),
  video_url: z.string().url().optional(),
  published_at: z.string().optional(),
  description: z.string().optional().nullable(),
  participant_ids: z.array(z.number().int().positive()).optional(),
})

// GET single live session
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: session, error } = await supabase
      .from('live_sessions')
      .select(
        `
        id,
        title,
        slug,
        genre,
        video_url,
        description,
        published_at,
        artist_id,
        created_at,
        updated_at,
        artist:artists(id, name, slug)
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      console.error('Failed to fetch live session:', error)
      return NextResponse.json(
        { error: 'Live session not found' },
        { status: 404 }
      )
    }

    // Get participants
    const { data: participants } = await supabase
      .from('artist_live_session_participant')
      .select('artist_id')
      .eq('live_session_id', id)

    return NextResponse.json({
      session: {
        ...session,
        participant_ids: participants?.map((p) => p.artist_id) || [],
      },
    })
  } catch (error) {
    console.error('Live session fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live session' },
      { status: 500 }
    )
  }
}

// Update live session
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateSchema.parse(body)

    // If slug is being updated, check for uniqueness
    if (validated.slug) {
      const { data: existing } = await supabase
        .from('live_sessions')
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
    }

    // Extract participant_ids before update
    const { participant_ids, ...sessionData } = validated

    // Only update if there's data to update
    if (Object.keys(sessionData).length > 0) {
      const { error } = await supabase
        .from('live_sessions')
        .update(sessionData)
        .eq('id', id)

      if (error) {
        console.error('Failed to update live session:', error)
        return NextResponse.json(
          { error: 'Failed to update live session' },
          { status: 500 }
        )
      }
    }

    // Update participants if provided
    if (participant_ids !== undefined) {
      // Delete existing participants
      await supabase
        .from('artist_live_session_participant')
        .delete()
        .eq('live_session_id', id)

      // Add new participants
      if (participant_ids.length > 0) {
        const participantRecords = participant_ids.map((artist_id) => ({
          artist_id,
          live_session_id: parseInt(id),
        }))

        const { error: participantError } = await supabase
          .from('artist_live_session_participant')
          .insert(participantRecords)

        if (participantError) {
          console.error('Failed to update participants:', participantError)
        }
      }
    }

    // Fetch updated session
    const { data: session } = await supabase
      .from('live_sessions')
      .select('*')
      .eq('id', id)
      .single()

    return NextResponse.json({ session })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Live session update error:', error)
    return NextResponse.json(
      { error: 'Failed to update live session' },
      { status: 500 }
    )
  }
}

// Delete live session
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete participants first (cascade should handle this but being explicit)
    await supabase
      .from('artist_live_session_participant')
      .delete()
      .eq('live_session_id', id)

    // Delete the session
    const { error } = await supabase
      .from('live_sessions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete live session:', error)
      return NextResponse.json(
        { error: 'Failed to delete live session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Live session deleted successfully' })
  } catch (error) {
    console.error('Live session deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete live session' },
      { status: 500 }
    )
  }
}
