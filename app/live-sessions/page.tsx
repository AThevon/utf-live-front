import SessionGrid from '@/components/SessionGrid';
import { getAllLiveSessions } from '@/lib/api/liveSessions';

export default async function LiveSessions() {
  const liveSessions = await getAllLiveSessions();
  return (
    <div className="px-4 md:px-20 pb-10 max-w-[2000px] mx-auto">
      <h1 className="text-3xl text-center md:text-start font-bold mb-6">Live Sessions</h1>
      <SessionGrid sessions={liveSessions} />
    </div>
  );
}