import Date from "../../../components/achat/add achat/1stCont/Date";
import Client from "../../../components/achat/add achat/1stCont/Client";
import Magasain from "../../../components/achat/add achat/1stCont/Magasain";

interface ProductStContProps {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  date: string;
  setDate: (value: string) => void;
  client: string;
  setClient: (value: string) => void;
  magasain: string;
  setMagasain: (value: string) => void;
}

const AchatStCont = ({
  control,
  clearErrors,
  register,
  errors,
  date,
  setDate,
  client,
  setClient,
  magasain,
  setMagasain,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <Date
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        value={date}
        setValue={setDate}
        id={"date"}
      />

      <Client
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"client"}
        value={client}
        setValue={setClient}
      />

      <Magasain
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"magasain"}
        value={magasain}
        setValue={setMagasain}
      />
    </section>
  );
};

export default AchatStCont;
