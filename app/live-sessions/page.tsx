import SessionGrid from '@/components/SessionGrid';
import { getAllLiveSessions } from '@/lib/api/liveSessions';

export default async function LiveSessions() {
  const liveSessions = await getAllLiveSessions();
  return (
    <div className='px-20'>
      <h1 className="text-3xl font-bold mb-6">Sessions</h1>
      <SessionGrid sessions={liveSessions} />
    </div>
  );
}