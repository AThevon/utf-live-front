'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@heroui/react';
import { Send } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type ContactButtonProps = React.ComponentProps<typeof Button> & {
  activeMatch?: boolean;
};

export default function ContactButton({
  className,
  activeMatch = true,
  ...props
}: ContactButtonProps) {
  const pathname = usePathname();
  const isActive = activeMatch && pathname === '/contact';

  return (
    <Button
      as={Link}
      href="/contact"
      startContent={
        <Send
          className={twMerge(
            'w-5 h-5 transition-transform duration-300 pointer-events-none',
            isActive ? 'rotate-45' : 'group-hover/btn:rotate-45'
          )}
        />
      }
      className={twMerge(
        'group/btn btn px-10 py-2 bg-zinc-800/50 rounded-md transition-all duration-300 flex items-center',
        isActive
          ? 'bg-zinc-50 text-black'
          : 'bg-white/10 text-white hover:bg-zinc-50 hover:text-black',
        className
      )}
      variant="flat"
      {...props}
    >
      Participer
    </Button>
  );
}
