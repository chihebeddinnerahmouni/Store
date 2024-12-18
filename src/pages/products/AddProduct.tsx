import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useState } from "react";



const AddProduct = () => {

  const [designation, setDesignation] = useState<string>("");
  const [codeBarre, setCodeBarre] = useState<string>("");

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter un produit" />
      <div className="">
        <ProductStCont
          designation={designation}
          setDesignation={setDesignation}
          codeBarre={codeBarre}
          setCodeBarre={setCodeBarre}
        />
      </div>
    </div>
  );
};

export default AddProduct;
