"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Platform } from "@/types";

type MusicContainerProps = {
  musicServices: Platform[];
};

export default function MusicContainer({ musicServices }: MusicContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const validServices = musicServices?.filter(s => s.icon_url) || [];

  if (validServices.length === 0) return null;

  const musicService = validServices[activeIndex];

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* Plateformes sous forme de grid dynamique */}
      <ul className={`relative flex mx-auto sm:mx-0 md:grid auto-cols-auto grid-flow-row gap-2 md:w-[12rem] ${validServices.length > 1 ? "md:grid-cols-2" : ""} `}>
        {validServices.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.li
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveIndex(index);
              }}
              className="relative cursor-pointer flex flex-col items-center justify-center gap-2 text-center px-5 md:px-0 py-2 rounded-xl transition-colors duration-200 hover:bg-zinc-800/50"
            >
              {/* fond animé */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-zinc-800 rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* contenu */}
              <div className="z-10 flex flex-col items-center justify-center gap-2">
                <Image src={service.icon_url!} alt={service.name} width={30} height={30} />
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Player iframe auto-adapté à la place dispo */}
      <div className="w-full h-[152px]">
        <iframe
          src={musicService.url}
          loading="lazy"
          allow="encrypted-media; autoplay"
          className="h-full w-full rounded-2xl shadow-lg"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  )

}
