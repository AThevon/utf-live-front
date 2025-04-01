type MusicPlayerProps = {
  embedUrl: string;
};

export default function MusicPlayer({ embedUrl }: MusicPlayerProps) {
  return (
    <>
        <iframe
          src={embedUrl}
          loading="lazy"
          allow="encrypted-media; autoplay"
          className="h-full w-full rounded-2xl shadow-lg"
          width="100%"
          height="100%"
        ></iframe>
    </>
  );
};