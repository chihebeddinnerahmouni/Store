import Date from "../../../components/achat/add achat/1stCont/Date";
import Client from "../../../components/achat/add achat/1stCont/Client";
import Magasain from "../../../components/achat/add achat/1stCont/Magasain";




interface ProductStContProps {
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
      <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8 lg:col-span-9">
          
          <Date
              clearErrors={clearErrors}
              register={register}
              errors={errors}
              value={date}
              setValue={setDate}
              id={"date"}
          />
          
            <Client
                clearErrors={clearErrors}
                register={register}
                errors={errors}
                id={"client"}
                value={client}
              setValue={setClient}
      />
      
      <Magasain
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"magasain"}
        value={magasain}
        setValue={setMagasain}
      />



      {/* <Designation
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"designation"}
        setDesignation={setDesignation}
        designation={designation}
      />

      <CodeBarre
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"codeBarre"}
        value={codeBarre}
        setValue={setCodeBarre}
      />
      <Category
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"category"}
        value={category}
        setValue={setCategory}
      />

      <Marque
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"marque"}
        value={marque}
        setValue={setMarque}
      />

      <Tax
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"tax"}
        value={tax}
        setValue={setTax}
      />

      <Description
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"description"}
        value={description}
        setValue={setDescription}
      /> */}
    </section>
  );
};


export default AchatStCont;
