import { IProvider } from "../../../types/achatSingle";
import KeyValue from "../../ventes/details/KeyValue";


interface Props {
    data: IProvider | null;
}   

const Provider = ({ data }: Props) => {

  return (
      <div className="">
        <h2 className="text-xl font-bold mb-2 text-main">Fournisseur</h2>
          <div className="grid grid-cols-1">
          <KeyValue title="Nom" value={data!.name} />
          <KeyValue title="Code" value={data!.code_provider} />
          <KeyValue title="Email" value={data!.email} />
          <KeyValue title="Telephone" value={data!.phone} />
          <KeyValue title="Adresse" value={data!.address} />
        </div>
    </div>
  )
}

export default Provider
