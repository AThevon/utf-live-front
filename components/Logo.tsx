import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={36}
      height={36}
      className="w-9 h-9"
      priority
    />
  );
}
