import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { uploadToS3, deleteFromS3 } from '@/lib/s3/upload'

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

    const formData = await request.formData()
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const type = formData.get('type') as string
    const iconFile = formData.get('icon') as File | null

    if (!name || !slug || !type) {
      return NextResponse.json(
        { error: 'Name, slug and type are required' },
        { status: 400 }
      )
    }

    // Get current platform to check for existing icon
    const { data: existingPlatform } = await supabase
      .from('platforms')
      .select('icon')
      .eq('id', id)
      .single()

    let iconPath = existingPlatform?.icon || null

    if (iconFile && iconFile.size > 0) {
      // Delete old icon if exists
      if (existingPlatform?.icon) {
        try {
          await deleteFromS3(existingPlatform.icon)
        } catch (e) {
          console.warn('Failed to delete old icon:', e)
        }
      }

      const extension = iconFile.name.split('.').pop() || 'svg'
      const fileName = `${slug}.${extension}`
      iconPath = `icons/platforms/${fileName}`

      await uploadToS3(iconFile, iconPath)
    }

    const { data: platform, error } = await supabase
      .from('platforms')
      .update({
        name,
        slug,
        type,
        icon: iconPath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ platform })
  } catch (error) {
    console.error('Error updating platform:', error)
    return NextResponse.json(
      { error: 'Failed to update platform' },
      { status: 500 }
    )
  }
}

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

    // Get platform to delete icon from S3
    const { data: platform } = await supabase
      .from('platforms')
      .select('icon')
      .eq('id', id)
      .single()

    if (platform?.icon) {
      try {
        await deleteFromS3(platform.icon)
      } catch (e) {
        console.warn('Failed to delete icon from S3:', e)
      }
    }

    const { error } = await supabase.from('platforms').delete().eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting platform:', error)
    return NextResponse.json(
      { error: 'Failed to delete platform' },
      { status: 500 }
    )
  }
}
