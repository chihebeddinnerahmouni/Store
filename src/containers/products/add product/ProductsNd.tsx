import Type from "../../../components/products/add products/2nd section/Type";
import PrixAchat from "../../../components/products/add products/2nd section/PrixAchat";
import PrixVente from "../../../components/products/add products/2nd section/PrixVente";
import Unite from "../../../components/products/add products/2nd section/Unite";
import UniteVente from "../../../components/products/add products/2nd section/UniteVente";
import UniteAchat from "../../../components/products/add products/2nd section/UniteAchat";
import StockAlert from "../../../components/products/add products/2nd section/StockAlert";
import NumSerie from "../../../components/products/add products/2nd section/NumSerie";


interface ProductStContProps {
  clearErrors: any;
  register: any;
  errors: any;
  type: string;
  setType: (value: string) => void;
  prixAchat: string;
  setPrixAchat: (value: string) => void;
  prixVente: string;
  setPrixVente: (value: string) => void;
  unite: string;
  setUnite: (value: string) => void;
  uniteVente: string;
  setUniteVente: (value: string) => void;
  uniteAchat: string;
  setUniteAchat: (value: string) => void;
  stockAlert: string;
  setStockAlert: (value: string) => void;
  numSerie: string;
  setNumSerie: (value: string) => void;
}

const ProductsNd = ({
  clearErrors,
  register,
  errors,
  type,
  setType,
  prixAchat,
  setPrixAchat,
  prixVente,
  setPrixVente,
  unite,
  setUnite,
  uniteVente,
  setUniteVente,
  uniteAchat,
  setUniteAchat,
  stockAlert,
  setStockAlert,
  numSerie,
  setNumSerie,
}: ProductStContProps) => {
  return (
    <section className="flex flex-col gap-5 lg:gap-8 lg:col-span-9">
      <div className="top cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <Type
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"type"}
          value={type}
          setValue={setType}
        />

        <PrixAchat
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"prixAchat"}
          value={prixAchat}
          setValue={setPrixAchat}
        />

        <PrixVente
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"prixVente"}
          value={prixVente}
          setValue={setPrixVente}
        />

        <Unite
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"unite"}
          value={unite}
          setValue={setUnite}
        />

        <UniteVente
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"uniteVente"}
          value={uniteVente}
          setValue={setUniteVente}
        />

        <UniteAchat
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"uniteAchat"}
          value={uniteAchat}
          setValue={setUniteAchat}
        />

        <StockAlert
          clearErrors={clearErrors}
          register={register}
          errors={errors}
          id={"stockAlert"}
          value={stockAlert}
          setValue={setStockAlert}
        />
      </div>

      <NumSerie
        value={numSerie}
        setValue={setNumSerie}
      />
    </section>
  );
};

export default ProductsNd;
