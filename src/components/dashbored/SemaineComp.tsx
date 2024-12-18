import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import CardTitle from './CardTitle';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mainColor = '#006233';

const data = {
  labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  datasets: [
    {
      label: 'Vente',
      data: [12000, 15000, 20000, 25000, 30000, 35000, 40000],
      backgroundColor: mainColor,
    },
    {
      label: 'Achat',
      data: [8000, 10000, 15000, 20000, 25000, 30000, 35000],
      backgroundColor: '#82ca9d',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const SemaineComp: React.FC = () => {
  return (
    <Box className="shadow-mainShadow p-[1.25em] rounded-10 flex flex-col xl:flex-grow">
      <CardTitle text="Ventes et achats de cette semaine" />
      <div className="mt-5 flex justify-center items-center flex-grow lg:h-[300px]">
        <Bar className="h-" data={data} options={options} />
      </div>
    </Box>
  );
};

export default SemaineComp;