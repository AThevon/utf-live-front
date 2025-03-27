'use client';

import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { Send } from 'lucide-react';

const navlinks = [
  { href: '/', text: 'Accueil' },
  { href: '/live-sessions', text: 'Live Sessions' },
  { href: '/artists', text: 'Artistes' },
  { href: '/about', text: 'à propos' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <Navbar shouldHideOnScroll maxWidth="full" isBlurred>
      <NavbarBrand>
        <Logo className="w-8 h-8" />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 relative" justify="center">
        {navlinks.map(({ href, text }) => {
          const isActive = pathname === href;
          return (
            <NavbarItem key={href} className="relative">
              <Link
                href={href}
                color={isActive ? 'primary' : 'foreground'}
                className="relative z-10 capitalize"
              >
                {text}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            startContent={<Send className={`w-5 h-5 group-hover/btn:rotate-45 transition-all ${pathname === "/contact" && 'rotate-45'}`} />}
            color="primary"
            href="/contact"
            variant="solid"
            className="group/btn text-black"
          >
            Nous contacter
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
