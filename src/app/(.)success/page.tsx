import { notFound } from "next/navigation";
import Success from "@/components/Success";
import { env } from "@/env";

type SuccessPageProps = {
	searchParams: Promise<{
		slug: string;
	}>;
};

const Page = async ({ searchParams }: SuccessPageProps) => {
	const { slug } = await searchParams;
	if (!slug) {
		return notFound();
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<h3 className="mb-3 text-xl">
					Successful! 🥳 Here&apos;s your teensy:{" "}
				</h3>
				<a
					href={`/${slug}`}
					className="mt-1 rounded-2xl bg-zinc-200/30 px-3 py-1"
				>
					<h1>{`${env.NEXT_PUBLIC_SITE_URL}/${slug}`}</h1>
				</a>
			</div>
			<Success slug={slug} />
		</div>
	);
};

export default Page;
