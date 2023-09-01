import { getAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import AnalyticsPieChart from "@/components/AnalyticsPieChart";

const Page = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const userTeensies = await db.teensy.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
    include: { visits: true },
  });

  const top5 = userTeensies.sort((a, b) => {
    return b.visits.length - a.visits.length;
  });

  const top5Slugs = top5?.slice(0, 5).map((teensy) => "/" + teensy.slug);
  const top5Visits = top5?.slice(0, 5).map((teensy) => teensy.visits.length);

  return (
    <div className="w-full">
      <AnalyticsPieChart top5Slugs={top5Slugs} top5Visits={top5Visits} />
    </div>
  );
};

export default Page;
