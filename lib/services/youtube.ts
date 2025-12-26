export interface YouTubeSnippet {
  title: string
  description: string
  publishedAt: string
  thumbnails: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
  }
}

export async function fetchYoutubeSnippet(
  videoId: string
): Promise<YouTubeSnippet | null> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    console.error('YOUTUBE_API_KEY is not defined')
    return null
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    )

    if (!response.ok) {
      console.error('YouTube API error:', response.status, response.statusText)
      return null
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      console.error('No video found for ID:', videoId)
      return null
    }

    return data.items[0].snippet as YouTubeSnippet
  } catch (error) {
    console.error('Failed to fetch YouTube snippet:', error)
    return null
  }
}

/**
 * Extract YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/, // Just the ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

/**
 * Convert any YouTube URL to embed format
 */
export function convertToYoutubeEmbedUrl(url: string): string | null {
  const videoId = extractYoutubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}
