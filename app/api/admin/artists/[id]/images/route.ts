import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { compressAndUploadImage, deleteFromS3 } from '@/lib/s3/upload'

// Upload multiple images for an artist
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

    // Get artist
    const { data: artist } = await supabase
      .from('artists')
      .select('id, name, slug')
      .eq('id', id)
      .single()

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadedImages = []

    for (const file of files) {
      // Compress and upload to S3
      const s3Path = await compressAndUploadImage(file, 'artists', artist.slug)

      // Create image record in DB
      const { data: image, error } = await supabase
        .from('images')
        .insert({
          path: s3Path,
          alt: artist.name,
          is_profile: false,
          is_thumbnail: false,
          imageable_id: artist.id,
          imageable_type: 'Artist',
        })
        .select()
        .single()

      if (error) {
        console.error('Failed to create image record:', error)
        // Clean up S3 file
        await deleteFromS3(s3Path)
        continue
      }

      uploadedImages.push(image)
    }

    return NextResponse.json({
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      images: uploadedImages,
    })
  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

// Delete an image
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
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
    }

    // Get image
    const { data: image } = await supabase
      .from('images')
      .select('id, path')
      .eq('id', imageId)
      .eq('imageable_id', id)
      .single()

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Delete from S3
    await deleteFromS3(image.path)

    // Delete from DB
    const { error } = await supabase.from('images').delete().eq('id', imageId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Image delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// Update image flags (is_profile, is_thumbnail)
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
    const { imageId, is_profile, is_thumbnail } = body

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
    }

    // If setting as profile, unset others
    if (is_profile) {
      await supabase
        .from('images')
        .update({ is_profile: false })
        .eq('imageable_id', id)
        .eq('imageable_type', 'Artist')
    }

    // If setting as thumbnail, unset others
    if (is_thumbnail) {
      await supabase
        .from('images')
        .update({ is_thumbnail: false })
        .eq('imageable_id', id)
        .eq('imageable_type', 'Artist')
    }

    // Update the target image
    const { data: image, error } = await supabase
      .from('images')
      .update({
        is_profile: is_profile ?? false,
        is_thumbnail: is_thumbnail ?? false,
      })
      .eq('id', imageId)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Image updated', image })
  } catch (error) {
    console.error('Image update error:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}
