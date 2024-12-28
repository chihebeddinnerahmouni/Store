import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import CardTitle from '../ui/CardTitle';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const mainColor = '#006233';



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};


interface Props {
  data: { achat: string[]; vente: string[] };
}

const SemaineComp = ({ data }: Props) => {

  // console.log(data);

  const dataChart = {
    labels: ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    datasets: [
      {
        label: 'Vente',
        // data: [12000, 15000, 20000, 25000, 30000, 35000, 40000],
        data: data.vente,
        backgroundColor: mainColor,
      },
      {
        label: 'Achat',
        // data: [8000, 10000, 15000, 20000, 25000, 30000, 35000],
        data: data.achat,
        backgroundColor: '#82ca9d',
      },
    ],
  };

  return (
    <Box className="cardCss flex flex-col xl:flex-grow">
      <CardTitle text="Ventes et achats de cette semaine" />
      <div className="mt-5 flex justify-center items-center flex-grow lg:h-[300px]">
        <Bar className="h-" data={dataChart} options={options} />
      </div>
    </Box>
  );
};

export default SemaineComp;
