import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExpiredTeensy() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">498</h1>
      <p className="text-center">
        teensy link has expired, contact the owner, create this teensy or
      </p>
      <Link href="/">
        <Button>Go back to home page 🏠</Button>
      </Link>
    </main>
  );
}
