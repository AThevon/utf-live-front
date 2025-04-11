"use client"

import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { ImageType } from "@/types"
import { Button } from "@heroui/react"
import Image from "next/image"
import Fade from "embla-carousel-fade"
import { motion, AnimatePresence } from "framer-motion"

type ImageSwiperProps = {
  images: ImageType[]
}

export default function ImageSwiper({ images }: ImageSwiperProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewer, setViewer] = useState<ImageType | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      align: "center",
      watchDrag: false,
    },
    [Fade()]
  )

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect).on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <>
      <div className="flex h-screen-minus-navbar w-full pt-4 pb-10 gap-2">
        {/* Thumbnails column (static) */}
        <div className="w-40 h-full flex flex-col gap-2 overflow-y-auto">
          {images.map((image, index) => (
            <Button
              key={index}
              variant="bordered"
              onPress={() => onThumbClick(index)}
              className={`w-full h-full relative rounded-md overflow-hidden p-0 transition-all ${
                index === selectedIndex ? "" : "border-transparent opacity-50"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index}`}
                className="object-cover"
                fill
              />
            </Button>
          ))}
        </div>

        {/* Main vertical swiper */}
        <div className="w-full overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex flex-col w-full h-full">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setViewer(img)}
                className="relative w-full h-screen-minus-navbar flex-shrink-0 cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Image ${index}`}
                  className="object-cover rounded-lg"
                  fill
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Viewer fullscreen */}
      <AnimatePresence>
        {viewer && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(null)}
          >
            <div className="relative w-[90vw] h-[90vh]">
              <Image
                src={viewer.url}
                alt={viewer.alt || "Image viewer"}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
