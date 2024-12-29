import Provider from "../../../components/achat/details/Provider"
import { IProvider } from "../../../types/achatSingle";
import { IEntrepot } from "../../../types/achatSingle";
import Entrepot from "../../../components/achat/details/Entrepot";




interface Props {
  providerData: IProvider | null;
  entrepotData: IEntrepot | null;
}

const infosCont = ({providerData, entrepotData}: Props) => {
  return (
    <div className="grid-cols-1 grid gap-5 lg:grid-cols-2">
          <Provider data={providerData} />
          <Entrepot data={entrepotData} />
    </div>
  )
}

export default infosCont
