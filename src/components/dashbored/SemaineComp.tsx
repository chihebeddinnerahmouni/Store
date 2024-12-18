// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Box } from '@mui/material';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const mainColor = '#006233';

// const data = {
//   labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
//   datasets: [
//     {
//       label: 'Vente',
//       data: [12000, 15000, 20000, 25000, 30000, 35000, 40000],
//       backgroundColor: mainColor,
//     },
//     {
//       label: 'Achat',
//       data: [8000, 10000, 15000, 20000, 25000, 30000, 35000],
//       backgroundColor: '#82ca9d',
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Ventes et Achats Hebdomadaires',
//     },
//   },
// };

// const SemaineComp: React.FC = () => {
//   return (
//     <Box className="shadow-mainShadow p-[1.25em] rounded-10 mt-10 lg:mt-14">
//       <Bar data={data} options={options} />
//     </Box>
//   );
// };

// export default SemaineComp;


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';

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
    title: {
      display: true,
      text: 'Ventes et Achats Hebdomadaires',
    },
  },
};

const SemaineComp: React.FC = () => {
  return (
    <Box className="shadow-mainShadow p-[1.25em] rounded-10 mt-10 lg:mt-14">
      <div className="h-64 md:h-80 lg:h-96">
        <Bar data={data} options={options} />
      </div>
    </Box>
  );
};

export default SemaineComp;