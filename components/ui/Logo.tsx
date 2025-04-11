import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/utf-logo.png"
      alt="Logo"
      width={36}
      height={36}
      className={`${className} rounded-full`}
      priority
    />
  );
}
