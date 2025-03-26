"use client";

import { motion } from 'framer-motion';

type ImageWrapperProps = {
  children: React.ReactNode;
  uniqueKey: string;
};

export default function ImageWrapper({ children, uniqueKey }: ImageWrapperProps) {
  return (
    <motion.div layoutId={`image-${uniqueKey}`}>
      {children}
    </motion.div>
  );
}