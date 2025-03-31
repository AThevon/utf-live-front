'use client';

import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Link from 'next/link';
import ContactButton from '@/components/ContactButton';
import { useState } from 'react';

const navlinks = [
  { href: '/', text: 'Accueil' },
  { href: '/live-sessions', text: 'Live Sessions' },
  { href: '/artists', text: 'Artistes' },
  { href: '/about', text: 'À propos' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar shouldHideOnScroll maxWidth="full" height={"5rem"} className='px-2' isBlurred isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand className="flex items-center gap-2">
        <Link href="/" className="hidden md:flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.95 }} tabIndex={-1}>
            <Logo className="w-14 h-14" />
          </motion.div>
        </Link>
        <Logo className="block md:hidden w-10 h-10" />
        <h1 className="block md:hidden">Under The Flow</h1>
      </NavbarBrand>

      {/* Menu Toggle Button for Mobile */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} />
      </NavbarContent>

      {/* Desktop Navigation Links */}
      <NavbarContent className="hidden md:flex gap-4 relative" justify="center">
        {navlinks.map(({ href, text }) => {
          const isActive = pathname === href;
          return (
            <NavbarItem key={href} className="relative h-8 flex items-center">
              {isActive && (
                <motion.div
                  layoutId="active-link-bg"
                  className="absolute inset-0 h-8 bg-zinc-50 rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Link
                href={href}
                className={`btn relative z-10 px-3 py-1 rounded-md capitalize ${isActive ? 'text-black' : 'text-white/80 hover:text-white'
                  }`}
              >
                {text}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Contact Button */}
      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <ContactButton />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Navigation Menu */}
      <NavbarMenu>
        {navlinks.map(({ href, text }) => (
          <NavbarMenuItem key={href}>
            <Link
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block md:hidden btn w-full px-4 py-2 rounded-md ${pathname === href ? 'bg-white text-black' : 'text-white'
                }`}
            >
              {text}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <ContactButton className="md:hidden w-full" onPress={() => setIsMenuOpen(false)} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
