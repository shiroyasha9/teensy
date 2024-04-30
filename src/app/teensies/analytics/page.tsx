import AnalyticsPieChart from "@/components/AnalyticsPieChart";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

const Page = async () => {
	const session = await getServerAuthSession();

	if (!session) {
		redirect("/login");
	}

	const userTeensies = await db.query.teensy.findMany({
		where: (t, { eq }) => eq(t.ownerId, session.user.id),
		orderBy: (t, { desc }) => desc(t.createdAt),
		with: { visits: true },
	});

	const top5 = userTeensies.sort((a, b) => {
		return b.visits.length - a.visits.length;
	});

	const top5Slugs = top5?.slice(0, 5).map((teensy) => `/${teensy.slug}`);
	const top5Visits = top5?.slice(0, 5).map((teensy) => teensy.visits.length);

	return (
		<div className="w-full">
			<AnalyticsPieChart top5Slugs={top5Slugs} top5Visits={top5Visits} />
		</div>
	);
};

export default Page;
