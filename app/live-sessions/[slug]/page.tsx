import { getLiveSession } from "@/lib/api/liveSessions";

type LiveSessionProps = {
  params: Promise<{ slug: string }>;
};

export default async function LiveSession({ params }: LiveSessionProps) {
  const { slug } = await params;
  const liveSession = await getLiveSession(slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Session</h1>
      <p>{liveSession.title}</p>
      <p>{liveSession.description}</p>
      <iframe src={liveSession.video_url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
    </div>
  );
}