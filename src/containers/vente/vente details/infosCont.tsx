import Client from "../../../components/ventes/details/Client"
import { IClient } from "../../../types/venteSingle";
import { IEntrepot } from "../../../types/venteSingle";
import Entrepot from "../../../components/ventes/details/Entrepot";
import Total from "../../../components/ventes/details/Total";



interface Props {
  clientData: IClient | null;
  entrepotData: IEntrepot | null;
  total: string;
}

const infosCont = ({ clientData, entrepotData, total }: Props) => {
  return (
    <div className="grid-cols-1 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <Client data={clientData} />
      <Entrepot data={entrepotData} />
      <Total data={total} />
    </div>
  );
};

export default infosCont
