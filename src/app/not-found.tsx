import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">404</h1>
      <p>Invalid alias, check for typos, or</p>
      <Link href="/">
        <Button title="Go back to home page 🏠" />
      </Link>
    </main>
  );
}
