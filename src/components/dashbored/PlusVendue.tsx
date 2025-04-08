import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import CardTitle from "../ui/CardTitle";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const firstColor = "#006233";
const secondColor = "#4CAF50";
const thirdColor = "#8BC34A";
const fourthColor = "#C8E6C9";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      enabled: true,
    },
  },
};

interface Props {
  pieChartData: { global_cost: string; name: string; quantity_sold: string }[];
}

const PlusVendue = ({ pieChartData }: Props) => {

  const chartData = useMemo(() => {
    return {
      labels: pieChartData.map((item) => item.name),
      datasets: [
        {
          label: "Ventes",
          data: pieChartData.map((item) => item.global_cost),
          backgroundColor: [firstColor, secondColor, thirdColor, fourthColor],
        },
      ],
    };
  }, [pieChartData]);

  return (
    <Box className="cardCss xl:w-[300px]">
      <CardTitle text="Produit Les Plus Vendus (2024)" />

      <div className="mt-5 h-[250px] flex justify-center items-center">
        {pieChartData.length === 1 ? (
          <p className="text-center">Pas de données</p>
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </Box>
  );
};

export default PlusVendue;
