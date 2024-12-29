import { IEntrepot } from "../../../types/achatSingle";
import KeyValue from "./KeyValue";

interface Props {
  data: IEntrepot | null;
}

const Entrepot = ({ data }: Props) => {

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2 text-main">Magasin</h2>
      <div className="grid grid-cols-1">
        <KeyValue title="Nom" value={data!.name} />
        <KeyValue title="Code" value={data!.code_entreport} />
      </div>
    </div>
  );
};


export default Entrepot;
