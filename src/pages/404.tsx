import Link from "next/link";
import Button from "../components/Button";
let origin = "";
if (typeof window !== "undefined") origin = window.location.origin;

export default function show404() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">404 </h1>
      <p>Invalid alias, check for typos, or</p>
      <Link href={origin}>
        <Button title="Go back to home page 🏠" />
      </Link>
    </main>
  );
}
