'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoscroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import ArtistCard from './ArtistCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { ArtistList } from '@/types';
import { Button, ButtonGroup } from '@heroui/react';

type ArtistGridProps = {
  artists: ArtistList[];
};

export default function ArtistGrid({ artists }: ArtistGridProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragThreshold: 5,
    },
    [
      // Autoscroll({
      //   speed: 0.4,
      //   startDelay: 4000,
      //   stopOnInteraction: true,
      // }),
      WheelGesturesPlugin(),
    ]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  if (!artists) return null;

  return (
    <div className="relative overflow-hidden flex flex-col min-h-screen-minus-navbar h-screen items-center xl:pt-4">
      {/* === Slider === */}
      <div ref={emblaRef} className="overflow-hidden rounded-lg w-full h-full flex-1">
        <div className="flex h-full">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex-shrink-0 md:px-2 w-full  md:w-1/2 xl:w-1/3 2xl:w-1/4"
            >
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </div>

      {/* === Controls (flèches + dots) === */}
      <div className="w-full relative my-6">
        {/* Dots centrés */}
        <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Aller à ${artists[index]?.name}`}
              className={`w-6 h-6 rounded-full border hover:border-medium hover:scale-105 active:scale-100 bg-transparent border-white/25 transition-all duration-150 ${selectedIndex === index
                ? '!border-white border-medium'
                : 'opacity-50 hover:opacity-100'
                }`}
            />
          ))}
        </div>

        {/* Flèches */}
        <div className="hidden md:flex justify-end gap-3 pr-2">
          <ButtonGroup
            variant="bordered"
          >
            <Button
              onPress={scrollPrev}
              isDisabled={prevBtnDisabled}
              aria-label="Précédent"
              className={`flex items-center justify-center hover:border-white/80 hover:z-10`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onPress={scrollNext}
              isDisabled={nextBtnDisabled}
              aria-label="Suivant"
              className={`flex items-center justify-center hover:border-white/80 hover:z-10`}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </ButtonGroup>
        </div>
      </div>

    </div>
  );
}
