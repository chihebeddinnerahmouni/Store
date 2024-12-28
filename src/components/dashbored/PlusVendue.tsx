import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import CardTitle from '../ui/CardTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const firstColor = "#006233";
const secondColor = "#4CAF50"; 
const thirdColor = "#8BC34A"; 
const fourthColor = "#C8E6C9"; 




const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            enabled: true,
        },
    },
};


interface Props {
    pieChartData: { global_cost: string; name: string; quantity_sold: string }[];
    }


const PlusVendue = ({pieChartData}: Props) => {

// const data = [
//   {
//     id: 1,
//     name: "coca-cola",
//     global_cost: 100,
//   },
//   {
//     id: 2,
//     name: "fanta",
//     global_cost: 90,
//   },
//   {
//     id: 3,
//     name: "sprite",
//     global_cost: 80,
//   },
//   {
//     id: 4,
//     name: "pepsi",
//     vendue: 70,
//   },
    //     ];
    
    // console.log(pieChartData);
    
    const data = pieChartData;
    const chartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Ventes",
          data: data.map((item) => item.global_cost),
          backgroundColor: [firstColor, secondColor, thirdColor, fourthColor],
          // hoverBackgroundColor: [
          //     '#FF6384',
          //     '#36A2EB',
          //     '#FFCE56',
          //     '#4BC0C0'
          // ],
        },
      ],
    };


    return (
      <Box className="cardCss xl:w-[300px]">
        <CardTitle text="Produit Les Plus Vendus (2024)" />

        <div className="mt-5 h-[250px] flex justify-center items-center">
          {data.length === 1 ? (
            <p className="text-center">Pas de données</p>
          ) : (
            <Pie data={chartData} options={options} />
          )}
        </div>
      </Box>
    );
};

export default PlusVendue;