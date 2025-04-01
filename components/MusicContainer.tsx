"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import Image from "next/image";
import { motion } from "framer-motion";

const musicServices = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/embed/artist/2RJLHbMQvZbxFIvI9rmfAI?utm_source=generator&theme=0",
    logo: "/icons/spotify.svg",
  },
  {
    name: "Apple Music",
    url: "https://embed.music.apple.com/fr/album/speedrun/1802573159",
    logo: "/icons/apple-music.svg",
  },
  {
    name: "Deezer",
    url: "https://widget.deezer.com/widget/dark/album/727590191",
    logo: "/icons/deezer.png",
  },
];

export default function MusicContainer() {
  const [musicService, setMusicService] = useState(musicServices[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMusicService(musicServices[0]);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* Plateformes sous forme de grid dynamique */}
      <ul className="flex mx-auto sm:mx-0 md:grid md:grid-cols-2 auto-cols-auto grid-flow-row gap-2 w-fit">
        {musicServices.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.li
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMusicService(service);
                setActiveIndex(index);
              }}
              className={`cursor-pointer flex flex-col items-center justify-center gap-2 text-center px-5 py-2 rounded-xl transition-colors duration-200 ${
                isActive ? "bg-zinc-800" : "hover:bg-zinc-700/50"
              }`}
            >
              <Image src={service.logo} alt={service.name} width={30} height={30} />
            </motion.li>
          );
        })}
      </ul>

      {/* Player iframe auto-adapté à la place dispo */}
      <div className="flex-1 w-full h-[152px]">
        <MusicPlayer embedUrl={musicService.url} />
      </div>
    </div>
  );
}
