"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type AnalyticsPieChartProps = {
  top5Slugs: string[];
  top5Visits: number[];
};

export default function AnalyticsPieChart({
  top5Slugs,
  top5Visits,
}: AnalyticsPieChartProps) {
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
              label: "No. of Views",
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
}
