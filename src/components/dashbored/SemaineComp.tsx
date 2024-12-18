import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Define the data type
interface DataType {
  day: string;
  date: string;
  vente: number;
  achat: number;
}

// Component
const SemaineComp
  : React.FC
  = () => {

    const mainColor = "#006233";
    
    return (
      <div className="shadow-mainShadow p-[1.25em] rounded-10">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vente" fill={mainColor} />
          <Bar dataKey="achat" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SemaineComp;


const data
  : DataType[]
  = [
{
  day: "Lundi",
  date: "12/07/2021",
  vente: 12000,
  achat: 8000,
},
{
  day: "Mardi",
  date: "13/07/2021",
  vente: 15000,
  achat: 10000,
},
{
  day: "Mercredi",
  date: "14/07/2021",
  vente: 20000,
  achat: 15000,
},
{
  day: "Jeudi",
  date: "15/07/2021",
  vente: 25000,
  achat: 20000,
},
{
  day: "Vendredi",
  date: "16/07/2021",
  vente: 30000,
  achat: 25000,
},
{
  day: "Samedi",
  date: "17/07/2021",
  vente: 35000,
  achat: 30000,
},
{
  day: "Dimanche",
  date: "18/07/2021",
  vente: 40000,
  achat: 35000,
},
];