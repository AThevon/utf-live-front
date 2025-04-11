import SessionGrid from '@/components/live-sessions/SessionGrid';
import { getAllLiveSessions } from '@/lib/api/liveSessions';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Live Sessions – Under The Flow',
  description: 'Plongez dans nos sessions live filmées avec soin, mettant en lumière des artistes émergents de la scène urbaine.',
};

export default async function LiveSessions() {
  const liveSessions = await getAllLiveSessions();
  return (
    <div className="px-4 sm:px-10 md:px-20 pb-10 max-w-[2000px] w-full mx-auto">
      <h1 className="text-3xl text-center md:text-start font-bold mb-4">Live Sessions</h1>
      <SessionGrid sessions={liveSessions} />
    </div>
  );
}