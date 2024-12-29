import { IClient } from "../../../types/venteSingle";
import KeyValue from "../../achat/details/KeyValue";

interface Props {
  data: IClient | null;
}

const Client = ({ data }: Props) => {

  // console.log(data);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2 text-main">Client</h2>
      <div className="grid grid-cols-1">
        <KeyValue title="Nom" value={data!.name} />
        <KeyValue title="Code" value={data!.code_client} />
        <KeyValue title="Email" value={data!.email} />
        <KeyValue title="Telephone" value={data!.phone} />
        <KeyValue title="Adresse" value={data!.address} />
      </div>
    </div>
  );
};

export default Client;
