// import Type from "../../../components/products/add products/2nd section/Type";
import PrixAchat from "../../../components/products/add products/2nd section/PrixAchat";
import PrixVente from "../../../components/products/add products/2nd section/PrixVente";
import Unite from "../../../components/products/add products/2nd section/Unite";
// import UniteVente from "../../../components/products/add products/2nd section/UniteVente";
// import UniteAchat from "../../../components/products/add products/2nd section/UniteAchat";
import StockAlert from "../../../components/products/add products/2nd section/StockAlert";
import NumSerie from "../../../components/products/add products/2nd section/NumSerie";
import Quantite from "../../../components/products/add products/2nd section/Quantite";

interface ProductStContProps {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  // type: string;
  // setType: (value: string) => void;
  prixAchat: string;
  setPrixAchat: (value: string) => void;
  prixVente: string;
  setPrixVente: (value: string) => void;
  unite: number;
  setUnite: (value: number) => void;
  // uniteVente: string;
  // setUniteVente: (value: string) => void;
  // uniteAchat: string;
  // setUniteAchat: (value: string) => void;
  stockAlert: string;
  setStockAlert: (value: string) => void;
  numSerie: boolean;
  setNumSerie: (value: boolean) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  unitesArray: any;
}

const ProductsNd = ({
  control,
  clearErrors,
  register,
  errors,
  // type,
  // setType,
  prixAchat,
  setPrixAchat,
  prixVente,
  setPrixVente,
  unite,
  setUnite,
  // uniteVente,
  // setUniteVente,
  // uniteAchat,
  // setUniteAchat,
  stockAlert,
  setStockAlert,
  numSerie,
  setNumSerie,
  quantity,
  setQuantity,
  unitesArray,
}: ProductStContProps) => {
  return (
    <section className="flex flex-col gap-5 lg:gap-8 lg:col-span-9">
      <div className="top cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        {/* <Type
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"type"}
          value={type}
          setValue={setType}
        /> */}

        <Quantite
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"quantity"}
          value={quantity}
          setValue={setQuantity}
        />

        <PrixAchat
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"prixAchat"}
          value={prixAchat}
          setValue={setPrixAchat}
        />

        <PrixVente
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"prixVente"}
          value={prixVente}
          setValue={setPrixVente}
        />

        <Unite
          options={unitesArray}
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"unite"}
          value={unite}
          setValue={setUnite}
        />

        {/* <UniteVente
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"uniteVente"}
          value={uniteVente}
          setValue={setUniteVente}
        />

        <UniteAchat
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"uniteAchat"}
          value={uniteAchat}
          setValue={setUniteAchat}
        /> */}

        <StockAlert
          control={control}
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"stockAlert"}
          value={stockAlert}
          setValue={setStockAlert}
        />
      </div>

      <NumSerie value={numSerie} setValue={setNumSerie} />
    </section>
  );
};

export default ProductsNd;
