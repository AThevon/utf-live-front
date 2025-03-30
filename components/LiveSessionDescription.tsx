'use client'

import Linkify from 'react-linkify'
import Link from 'next/link'
import Image from 'next/image'
import type { LiveSession, Participant, Social } from '@/types'

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
          <Linkify
            componentDecorator={(href, text, key) => (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 hover:text-zinc-300 transition-all underline"
              >
                {text}
              </Link>
            )}
          >
            {line.split(/(\s+)/).map((word, i) => {
              if (word.startsWith('@')) {
                const username = word.slice(1).toLowerCase()
                const social = mentionMap[username]
                const url = social?.url || `https://instagram.com/${username}`

                return (
                  <Link
                    key={`${index}-${i}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-zinc-100 hover:text-zinc-300 transition-all items-center gap-1 font-semibold"
                  >
                    <Image
                      src="/icons/instagram.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                    {username}
                  </Link>
                )
              }

              return <span key={`${index}-${i}`}>{word}</span>
            })}
          </Linkify>
        </p>
      ))}
    </div>
  )
}

// === UTILS ===

function buildMentionMap(session: LiveSession): Record<string, { url: string }> {
  const mentionMap: Record<string, { url: string }> = {}

  const collect = (socials: Social[]) => {
    socials.forEach((social) => {
      const username = extractUsernameFromURL(social.url)
      if (username) {
        mentionMap[username.toLowerCase()] = {
          url: social.url,
        }
      }
    })
  }

  collect(session.artist?.socials || [])
  session.participants?.forEach((p: Participant) => collect(p.socials || []))

  return mentionMap
}

function extractUsernameFromURL(url: string): string | null {
  const match = url.match(/(?:\.com\/)([\w.\-_]+)/)
  return match ? match[1] : null
}
