import Link from "next/link";
let origin = "";
if (typeof window !== "undefined") origin = window.location.origin;

export default function show404() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-9xl font-bold">404 </h1>
      <p>Invalid alias, check for typos, or</p>
      <Link href={origin}>
        <button className="mt-2 cursor-pointer rounded bg-lemon-400 px-2 py-1 font-semibold text-gray-950">
          Go back to home page 🏠
        </button>
      </Link>
    </main>
  );
}
