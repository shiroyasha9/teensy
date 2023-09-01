import Success from "@/components/Success";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";

type SuccessPageProps = {
  searchParams: {
    slug: string;
  };
};

const Page = ({ searchParams: { slug } }: SuccessPageProps) => {
  if (!slug) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center  justify-center">
        <h3 className="mb-3 text-xl">
          Successful! 🥳 Here&apos;s your teensy:{" "}
        </h3>
        <a
          href={`/${slug}`}
          className="mt-1 rounded-2xl bg-gray-200/30 px-3 py-1"
        >
          <h1>{`${env.NEXT_PUBLIC_SITE_URL}/${slug}`}</h1>
        </a>
      </div>
      <Success slug={slug} />
    </div>
  );
};

export default Page;
