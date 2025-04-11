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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      as={Link as any}
      href="/contact"
      startContent={
        <Send
          className={twMerge(
            'w-5 h-5 transition-transform duration-300 pointer-events-none',
            isActive ? 'rotate-45 -translate-y-[1px]' : 'group-hover/btn:rotate-45 group-hover/btn:-translate-y-[1px]',
          )}
        />
      }
      className={twMerge(
        'group/btn btn px-10 py-2 rounded-md transition-all duration-300 flex items-center',
        isActive
          ? 'bg-white text-black'
          : 'bg-zinc-800/50 text-white hover:bg-zinc-50 hover:text-black',
        className
      )}
      variant="flat"
      size="lg"
      {...props}
    >
      Participer
    </Button>
  );
}
