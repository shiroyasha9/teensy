import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex items-center justify-center">
      <a
        href="https://www.buymeacoffee.com/mubinansari"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/bmc.svg"
          alt="buy me a coffee icon"
          width={545 * 0.25}
          height={153 * 0.25}
          priority
        />
      </a>
    </div>
  );
}
