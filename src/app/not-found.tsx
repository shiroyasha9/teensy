import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">404</h1>
      <p>Invalid alias, check for typos, or</p>
      <Link href="/">
        <Button>Go back to home page 🏠</Button>
      </Link>
    </main>
  );
}
