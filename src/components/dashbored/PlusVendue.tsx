import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import CardTitle from './CardTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const firstColor = "#006233";
const secondColor = "#4CAF50"; 
const thirdColor = "#8BC34A"; 
const fourthColor = "#C8E6C9"; 

const data = [
    {
        id: 1,
        name: "coca-cola",
        vendue: 100
    },
    {
        id: 2,
        name: "fanta",
        vendue: 90
    },
    {
        id: 3,
        name: "sprite",
        vendue: 80
    },
    {
        id: 4,
        name: "pepsi",
        vendue: 70
    }
];

const chartData = {
    labels: data.map(item => item.name),
    datasets: [
        {
            label: 'Ventes',
            data: data.map(item => item.vendue),
            backgroundColor: [
                firstColor,
                secondColor,
                thirdColor,
                fourthColor
            ],
            // hoverBackgroundColor: [
            //     '#FF6384',
            //     '#36A2EB',
            //     '#FFCE56',
            //     '#4BC0C0'
            // ],
        },
    ],
};

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

const PlusVendue = () => {
    return (
      <Box className="shadow-mainShadow p-[1.25em] rounded-10 xl:w-[300px]">

            <CardTitle text="Produit Les Plus Vendus (2024)" />

        <div className="mt-5 h-[250px] flex justify-center items-center">
          <Pie data={chartData} options={options} />
        </div>
      </Box>
    );
};

export default PlusVendue;