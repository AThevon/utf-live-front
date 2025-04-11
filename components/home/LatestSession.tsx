"use client";

import { LiveSessionList } from "@/types";
import ArtistAvatar from "@/components/ui/ArtistAvatar";
import TooltipWrapper from "@/components/layout/TooltipWrapper";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type LatestSessionProps = {
  session: LiveSessionList;
};

export default function LatestSession({ session }: LatestSessionProps) {
  if (!session) return null;

  return (
    <div className="md:min-h-screen max-w-[1500px] w-full flex flex-col md:justify-center mx-auto px-4 md:px-40">
      <motion.h2
        initial={{ opacity: 0, x: -20, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        className="text-2xl lg:text-4xl font-bold !tracking-widest md:-translate-x-8">
        {session.title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, x: 20, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      >
        <ArtistAvatar artist={session.artist} className="mt-4 translate-x-4" />
      </motion.div>
      <div className="h-full my-10 flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="relative h-full w-full">
          <iframe
            src={session.video_url}
            className="w-full aspect-video rounded-xl overflow-hidden shadow-xl group-hover/btn:rounded-none"
            allow="autoplay; fullscreen"
          />
          <TooltipWrapper content="Regarder la session" placement="left">
            <Button
              as={Link}
              href={`/live-sessions/${session.slug}`}
              variant="light"
              size="lg"
              isIconOnly
              aria-label="Voir la session"
              className="group/btn flex-1 absolute top-0 h-full w-[4%] left-[100.5%]"
            >
              <ArrowRight className="w-7 h-7 opacity-50 group-hover/btn:opacity-100 -translate-x-0.5 group-hover/btn:translate-x-0 transition-all" />
            </Button>
          </TooltipWrapper>
        </motion.div>
      </div>
    </div>
  );
}