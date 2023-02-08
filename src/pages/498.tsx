import Button from "$components/Button";
import Link from "next/link";
let origin = "";
if (typeof window !== "undefined") origin = window.location.origin;

export default function show498() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">498</h1>
      <p className="text-center">
        teensy link has expired, contact the owner, create this teensy or
      </p>
      <Link href={origin}>
        <Button title="Go back to home page 🏠" />
      </Link>
    </main>
  );
}
