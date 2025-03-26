'use client';

import SessionCard from './SessionCard';
import type { LiveSessionList } from '@/types';

type SessionGridProps = {
  sessions: LiveSessionList[];
};


export default function SessionGrid({ sessions }: SessionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}