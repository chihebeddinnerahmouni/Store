import Loading from "../../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IInventaire from "../../../types/rapport/inventaire/inventaire";
import { IIventaireTable } from "../../../types/rapport/inventaire/inventaire";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/inventaire/ButtonsCont";
import MagasinSelect from "../../../containers/raports/MagasinSelect";
import TableInventaire from "../../../containers/raports/inventaire/TableInventaire";

const Inventaire = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IInventaire[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    Promise.all([
      axios.get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // axios.get(url + "/api/reports/stock-alerts/" + magasinId , {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }),
    ])
      .then(
        axios.spread(
          (
            // data,
            magasins
          ) => {
            // console.log(magasins.data.entrepots);
            const newArrayAchats = createNewArrayAchats(data_test_achat);
            setData(newArrayAchats);
            setMagasinsArray(magasins.data.entrepots);
            setLoading(false);
          }
        )
      )
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'inventaire" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <ButtonsCont columns={columnsAchats} data={data} />
      </div>
      <TableInventaire columns={columnsAchats} rows={data} />
    </div>
  );
};

const columnsAchats: (keyof IIventaireTable)[] = [
  "code",
    "désignation",
    "catégorie",
    "stock_actuel"
];

const data_test_achat = [
  {
    id: 9,
    name: "prod1 pdated",
    code_barre: "123456789",
    category_id: 2,
    brand_id: 1,
    unit_id: 1,
    rayonage_id: 1,
    tax_percentage: "0.00",
    description: "This is Product A.",
    price_buy: "100.00",
    price_sell: "150.00",
    stock_alert: 10,
    quantity: 500,
    has_serial_number: 0,
    created_by: 1,
    updated_by: 2,
    deleted_by: null,
    created_at: "2024-12-24T13:40:17.000000Z",
    updated_at: "2024-12-24T16:38:43.000000Z",
    category: {
      id: 2,
      code_category: "TS",
      name_category: "test",
      description: "test",
      status: "active",
      deleted_by: null,
      created_by: 2,
      updated_by: null,
      created_at: "2024-12-24T16:34:03.000000Z",
      updated_at: "2024-12-24T16:34:03.000000Z",
    },
    brand: {
      id: 1,
      code_brand: "BR001",
      name_brand: "Brand Name",
      description: "Brand description",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:18:46.000000Z",
      updated_at: "2024-12-24T11:18:46.000000Z",
    },
    unit: {
      id: 1,
      code_unit: "KG",
      name_unit: "Kilogram",
      description: "Unit of mass",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:27:08.000000Z",
      updated_at: "2024-12-24T11:27:08.000000Z",
    },
    rayonage: {
      id: 1,
      code_location: "R002",
      name: "Main Shelf A",
      description: "Primary shelf in the main warehouse",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:24:31.000000Z",
      updated_at: "2024-12-24T11:24:31.000000Z",
    },
  },
  {
    id: 10,
    name: "coca cola",
    code_barre: "4082468043",
    category_id: 1,
    brand_id: 1,
    unit_id: 1,
    rayonage_id: 1,
    tax_percentage: "10.00",
    description: "soda",
    price_buy: "80.00",
    price_sell: "127.00",
    stock_alert: 10,
    quantity: 0,
    has_serial_number: 0,
    created_by: 2,
    updated_by: null,
    deleted_by: null,
    created_at: "2024-12-24T15:28:39.000000Z",
    updated_at: "2024-12-24T15:28:39.000000Z",
    category: {
      id: 1,
      code_category: "CAT001",
      name_category: "Électronique",
      description: "Tous les articles électroniques",
      status: "active",
      deleted_by: null,
      created_by: 1,
      updated_by: 1,
      created_at: "2024-12-24T11:18:52.000000Z",
      updated_at: "2024-12-24T11:48:38.000000Z",
    },
    brand: {
      id: 1,
      code_brand: "BR001",
      name_brand: "Brand Name",
      description: "Brand description",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:18:46.000000Z",
      updated_at: "2024-12-24T11:18:46.000000Z",
    },
    unit: {
      id: 1,
      code_unit: "KG",
      name_unit: "Kilogram",
      description: "Unit of mass",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:27:08.000000Z",
      updated_at: "2024-12-24T11:27:08.000000Z",
    },
    rayonage: {
      id: 1,
      code_location: "R002",
      name: "Main Shelf A",
      description: "Primary shelf in the main warehouse",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:24:31.000000Z",
      updated_at: "2024-12-24T11:24:31.000000Z",
    },
  },
];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      code: item.code_barre,
      désignation: item.name,
      catégorie: item.category.name_category,
      stock_actuel: item.quantity,
    };
  });
};

export default Inventaire;
