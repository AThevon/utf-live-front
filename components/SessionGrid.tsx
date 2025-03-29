'use client';

import SessionCard from './SessionCard';
import type { LiveSessionList } from '@/types';

type SessionGridProps = {
  sessions: LiveSessionList[];
};


export default function SessionGrid({ sessions }: SessionGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
      {sessions.map((session, index) => (
        <SessionCard key={session.id} session={session} index={sessions.length - index} />
      ))}
    </div>
  );
}