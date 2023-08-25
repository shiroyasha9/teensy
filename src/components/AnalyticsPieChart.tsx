import { api } from "@/utils/api";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPieChart = () => {
  const userTeensies = api.fetchUserSlugs.useQuery();

  const top5 = userTeensies.data?.teensies.sort((a, b) => {
    return b.visits.length - a.visits.length;
  });
  const top5Slugs = top5?.slice(0, 5).map((teensy) => "/" + teensy.slug);
  const top5Visits = top5?.slice(0, 5).map((teensy) => teensy.visits.length);
  return (
    <div>
      <Pie
        height={10}
        width={10}
        className="max-h-[20rem]"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 16,
                color: "white",
                font: {
                  size: 14,
                },
              },
            },
          },
        }}
        data={{
          labels: top5Slugs,

          datasets: [
            {
              data: top5Visits,
              label: "# of Votes",
              backgroundColor: [
                "hsl(0, 75%, 70%)",
                "hsl(48, 75%, 70%)",
                "hsl(81, 75%, 70%)",
                "hsl(186, 75%, 70%)",
                "hsl(251, 75%, 70%)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default AnalyticsPieChart;
