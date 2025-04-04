'use client'

import Link from 'next/link'
import type { LiveSession, Participant, Platform } from '@/types'

type Props = {
  description: string
  session: LiveSession
}

export default function LiveSessionDescription({ description, session }: Props) {
  const mentionMap = buildMentionMap(session)
  const lines = description.split('\n')

  return (
    <div className="flex-1 mt-4 text-md text-zinc-200 space-y-5">
      {lines.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap break-keep leading-relaxed">
          {renderLineWithMentions(line, mentionMap)}
        </p>
      ))}
    </div>
  )
}

// === UTILS ===

function renderLineWithMentions(line: string, mentionMap: Record<string, { url: string }>) {
  const words = line.split(/(\s+)/)

  return words.map((word, i) => {
    if (word.startsWith('@')) {
      const username = word.slice(1).toLowerCase()
      const social = mentionMap[username]
      const url = social?.url || `https://instagram.com/${username}`

      return (
        <Link
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-zinc-100 hover:text-zinc-300 transition-all items-center gap-1 font-semibold"
        >
          @{username}
        </Link>
      )
    }

    if (isUrl(word)) {
      return (
        <Link
          key={i}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-100 underline hover:text-zinc-300 transition"
        >
          {word}
        </Link>
      )
    }

    return word
  })
}

function isUrl(word: string) {
  try {
    const url = new URL(word)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function buildMentionMap(session: LiveSession): Record<string, { url: string }> {
  const mentionMap: Record<string, { url: string }> = {}

  const collect = (socials: Platform[]) => {
    socials.forEach((social) => {
      const username = extractUsernameFromURL(social.url)
      if (username) {
        mentionMap[username.toLowerCase()] = {
          url: social.url,
        }
      }
    })
  }

  collect(session.artist?.platforms.social || [])
  session.participants?.forEach((p: Participant) => collect(p.platforms || []))

  return mentionMap
}

function extractUsernameFromURL(url: string): string | null {
  const match = url.match(/(?:\.com\/)([\w.\-_]+)/)
  return match ? match[1] : null
}
