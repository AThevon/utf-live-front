'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import Logo from './Logo'; // Ton composant logo actuel

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-black px-6 pt-8 pb-5"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-20 text-center items-start">

        {/* Liens */}
        <div className="space-y-3 md:text-end">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            À propos
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/artists" className="hover:underline">
                Les artistes
              </Link>
            </li>
            <li>
              <Link href="/live-sessions" className="hover:underline">
                Nos lives
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                Notre histoire
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="w-fit mx-auto">
          <Logo className="w-32" />
        </Link>

        {/* Réseaux sociaux */}
        <div className="space-y-3 md:text-start">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Restez connectés
          </h3>
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="https://instagram.com/utflive"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors flex items-center gap-2"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7" />
              Instagram
            </Link>
            <Link
              href="https://youtube.com/@utflive"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors flex items-center gap-2"
              aria-label="YouTube"
            >
              <Youtube className="w-7 h-7" />
              YouTube
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs">
        © {new Date().getFullYear()} UTF Live. Tous droits réservés.
      </div>
    </motion.footer>
  );
}
