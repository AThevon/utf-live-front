'use client';

import SessionCard from './SessionCard';

const mockSessions = [
  {
    title: 'Session avec SOA',
    artist: 'SOA',
    thumbnail: '/sessions/soa.jpg',
    href: '/sessions/soa',
  },
  {
    title: 'Live @ Studio B',
    artist: 'Naya',
    thumbnail: '/sessions/naya.jpg',
    href: '/sessions/naya',
  },
  {
    title: 'Urban Soul',
    artist: 'JAYE',
    thumbnail: '/sessions/jaye.jpg',
    href: '/sessions/jaye',
  },
];

export default function SessionGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {mockSessions.map((session) => (
        <SessionCard key={session.href} {...session} />
      ))}
    </div>
  );
}