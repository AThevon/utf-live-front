'use client';

import SessionCard from './SessionCard';
import type { LiveSessionList } from '@/types';

type SessionGridLatestProps = {
  sessions: LiveSessionList[];
};


export default function SessionGridLatest({ sessions }: SessionGridLatestProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}