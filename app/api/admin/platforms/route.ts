import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/s3/upload'

export async function POST(request: Request) {
  try {
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

    let iconPath: string | null = null

    if (iconFile && iconFile.size > 0) {
      const extension = iconFile.name.split('.').pop() || 'svg'
      const fileName = `${slug}.${extension}`
      iconPath = `icons/platforms/${fileName}`

      await uploadToS3(iconFile, iconPath)
    }

    const { data: platform, error } = await supabase
      .from('platforms')
      .insert({
        name,
        slug,
        type,
        icon: iconPath,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ platform })
  } catch (error) {
    console.error('Error creating platform:', error)
    return NextResponse.json(
      { error: 'Failed to create platform' },
      { status: 500 }
    )
  }
}
