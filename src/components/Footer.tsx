import { api } from "$utils/api";
import Image from "next/image";

export default function Footer() {
  const visitorsCount = api.fetchGlobalVisitsCounts.useQuery();
  return (
    <div className="flex flex-col items-center justify-center">
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
      <p className="mt-2 font-mono text-xs">
        {visitorsCount.data ?? "Fetching"} Unique Visitors
      </p>
    </div>
  );
}
