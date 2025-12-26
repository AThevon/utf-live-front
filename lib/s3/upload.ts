import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

/**
 * Upload raw file to S3
 */
export async function uploadToS3(
  file: File,
  path: string
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: path,
    Body: buffer,
    ContentType: file.type,
  })

  await s3Client.send(command)

  return path
}

/**
 * Compress image to WebP and upload to S3
 * Mimics Laravel's Intervention Image behavior:
 * - Converts to WebP format (quality 90%)
 * - Scales down if height > 1080px
 * - Generates UUID-based filename
 */
export async function compressAndUploadImage(
  file: File,
  folder: string,
  slug: string
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  // Process image with sharp
  let image = sharp(buffer)
  const metadata = await image.metadata()

  // Scale down if too large
  if (metadata.height && metadata.height > 1080) {
    image = image.resize({ height: 1080, withoutEnlargement: true })
  }

  // Convert to WebP with 90% quality
  const webpBuffer = await image
    .webp({ quality: 90 })
    .toBuffer()

  // Generate S3 path: folder/slug/uuid.webp
  const filename = `${folder}/${slug}/${uuidv4()}.webp`

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: filename,
    Body: webpBuffer,
    ContentType: 'image/webp',
  })

  await s3Client.send(command)

  return filename
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(path: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: path,
  })

  await s3Client.send(command)
}

/**
 * Generate S3 path with timestamp
 */
export function generateS3Path(folder: string, filename: string): string {
  const timestamp = Date.now()
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `${folder}/${timestamp}-${sanitized}`
}
