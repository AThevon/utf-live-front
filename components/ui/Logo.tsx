import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/utf-logo.png"
      alt="Logo"
      width={1000}
      height={1000}
      className={`${className} rounded-full`}
      priority
    />
  );
}
