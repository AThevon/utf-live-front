'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import TooltipWrapper from '@/components/TooltipWrapper';

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

type Props = {
  url: string;
};

export default function MiniAudioPlayer({ url }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  return (
    <div className="w-full mt-2 p-2 rounded-xl bg-zinc-800/60 backdrop-blur flex flex-col gap-2 shadow-inner">
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <TooltipWrapper content={isPlaying ? 'Pause' : 'Play'}>
          <Button
            isIconOnly
            aria-label="Play/Pause"
            color="default"
            onPress={() => {
              setIsPlaying((p) => !p);
            }}
          >

            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
        </TooltipWrapper>


        {/* </button> */}
        <div className={`flex flex-col flex-1 gap-2 h-full mt-4 transition-transform duration-300 ${isPlaying ? '' : '-translate-y-2'}`}>
          {/* Waveform animation */}
          <motion.div
            className="flex gap-[3px] h-full pr-1 w-full items-end flex-1"
            animate={{ opacity: isPlaying ? 1 : 0.2 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(25)].map((_, i) => (
              <motion.span
                key={i}
                className="w-full h-[1px] bg-white rounded-full origin-bottom"
                animate={
                  isPlaying
                    ? { scaleY: [1, 10, 1] }
                    : { scaleY: 1 }
                }
                transition={
                  isPlaying
                    ? {
                      duration: 0.6,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: i * 0.05,
                    }
                    : { duration: 0 }
                }
              />
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="w-full h-[4px] bg-white/20 rounded-lg overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: `${played * 100}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Hidden ReactPlayer */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        controls={false}
        height={0}
        width={0}
        style={{ display: 'none' }}
        onProgress={({ played }) => setPlayed(played)}
      />
    </div>
  );
}
