import Provider from "../../../components/achat/details/Provider"
import { IProvider } from "../../../types/provider";
import { IEntrepot } from "../../../types/achatSingle";
import Entrepot from "../../../components/ventes/details/Entrepot";
import Total from "../../../components/ventes/details/Total";



interface Props {
  providerData: IProvider | null;
  entrepotData: IEntrepot | null;
  total: string;
}

const infosCont = ({providerData, entrepotData, total}: Props) => {
  return (
    <div className="grid-cols-1 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <Provider data={providerData} />
      <Entrepot data={entrepotData} />
      <Total data={total} />
    </div>
  )
}

export default infosCont
