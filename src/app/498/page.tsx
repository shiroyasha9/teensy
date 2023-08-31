import Button from "@/components/Button";
import Link from "next/link";

export default function ExpiredTeensy() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">498</h1>
      <p className="text-center">
        teensy link has expired, contact the owner, create this teensy or
      </p>
      <Link href="/">
        <Button title="Go back to home page 🏠" />
      </Link>
    </main>
  );
}