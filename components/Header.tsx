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
import Logo from './Logo';

const navlinks = [
  { href: '/', text: 'Accueil' },
  { href: '/live-sessions', text: 'Live Sessions' },
  { href: '/artists', text: 'Artistes' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <Navbar shouldHideOnScroll maxWidth='full'>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navlinks.map(({ href, text }) => (
          <NavbarItem key={href} isActive={pathname === href}>
            <Link
              color={pathname === href ? 'primary' : 'foreground'}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/contact"
            variant={pathname === '/contact' ? 'flat' : 'bordered'}
            disabled={pathname === '/contact'}
          >
            Nous contacter
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
