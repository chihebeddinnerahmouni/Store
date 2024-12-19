import CardTitle from "./CardTitle";
import { IoSearchSharp } from "react-icons/io5";

const TableTop = ({ title, value, setValue }: {
    title: string;
    value: string;
    setValue: (value: string) => void;
}) => {
  return (
    <div className="top flex items-center justify-between">
      <CardTitle text={title} />
      <div className="search relative">
        <input
          type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          placeholder="Chercher un produit"
          className={`p-2 w-[130px] border rounded-40 outline-main font-medium bg-emptyInput  pl-7 md:w-[200px] lg:w-[300px]`}
        />
        <IoSearchSharp
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 text-[18px] left-2`}
        />
      </div>
    </div>
  );
}

export default TableTop
