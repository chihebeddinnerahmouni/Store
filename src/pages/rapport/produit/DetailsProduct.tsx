import { useState, useEffect } from "react";
import axios from "axios";
import { IProductDetails } from "../../../types/rapport/produits/details/product";
import { IProductDetailsTable } from "../../../types/rapport/produits/details/product";
import { enqueueSnackbar } from "notistack";
import ButtonsContAchat from "../../../containers/raports/produits/details/achat/ButtonsCont";
// import ButtonsContVentes from "../../../containers/raports/inventaire/details/vente/ButtonsCont";
import TableAchat from "../../../containers/raports/produits/details/achat/TableAchat";
// import { ITableEntrepotVente } from "../../../types/rapport/entrepot/entrepot_vente";
// import IEntVente from "../../../types/rapport/entrepot/entrepot_vente";
// import TableVentes from "../../../containers/raports/inventaire/details/vente/TableVentes";
// import SwitchButtons from "../../../components/rapport/SwitchButtons";
// import QuatiteTable from "../../../containers/raports/inventaire/details/QuatiteTable";
import { useParams } from "react-router-dom";
import DatesCont from "../../../containers/raports/DatesCont";
import QuatiteTable from "../../../containers/raports/QuatiteTable";
import PageTitle from "../../../components/ui/PageTitle"; 
import Loading from "../../../components/ui/Loading";



const DetailsProduct = () => {

  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

    const todatSratDate = new Date().toISOString().split("T")[0];


  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>({});
  const [dataAchats, setDataAchats] = useState<IProductDetails[]>([]);
  //   const [dataVentes, setDataVentes] = useState<IEntVente[]>([]);
  // const [statsArray, setStatsArray] = useState<
  //   { magasin: string; quantité: number }[]
  // >([]);
  // const [selected, setSelected] = useState<"achats" | "ventes">("achats");
  // const [selected, setSelected] = useState<string>("Achats");
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [quantityArray, setQuantityArray] = useState<{ entrepot_name: string; quantity: number }[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [usersArray, setUsersArray] = useState<any[]>([]);
  const [magasinName, setMagasinName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientsArray, setClientsArray] = useState<any[]>([]);
  const [userInvNumber, setUserInvNumber] = useState<string>("");

  const { produitId } = useParams();
  const id = Number(produitId);
  const url = import.meta.env.VITE_BASE_URL as string;

  // console.log(magasinsArray);
  // console.log(id);

  useEffect(() => {
    Promise.all([
      axios.get(
        `${url}/api/reports/products/${id}/detailed-report?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/user/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]).then(
      axios.spread((data, magasinsResult, usersResult, clientsResult) => {
        // console.log(clientsResult.data);
        const newArrayAchats = createNewArrayAchats(data.data.details);
        setProduct(data.data.product);
        setDataAchats(newArrayAchats);
        setQuantityArray(data.data.entrepot_quantities);
        setMagasinsArray(magasinsResult.data.entrepots);
        setUsersArray(usersResult.data.users);
        setClientsArray(clientsResult.data.clients);
        setLoading(false);
      })
    );
  }, []);


  useEffect(() => { 
    if (startDate === formattedDate && endDate === todatSratDate) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `${url}/api/reports/products/${id}/detailed-report?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
    )
      .then((response) => {
        const newArrayAchats = createNewArrayAchats(response.data.details);
        setProduct(response.data.product);
        setDataAchats(newArrayAchats);
        setQuantityArray(response.data.entrepot_quantities);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [startDate, endDate]);



  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de produit" />
        <div className="w-full">
          <p className="text-center font-bold text-xl mb-5">{product.name}</p>

          {/* {selected === "achats" ? ( */}
        <ButtonsContAchat
          setData={setDataAchats}
            columns={columnsAchats}
            data={dataAchats}
            magasinsArray={magasinsArray}
            usersArray={usersArray}
            setMagasinName={setMagasinName}
            setUserName={setUserName}
            magasinName={magasinName}
          userName={userName}
          clientsArray={clientsArray}
          clientName={clientName}
          setClientName={setClientName}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
          />
          {/* ) : (
               <ButtonsContVentes columns={columnsVentes} data={dataVentes} />
             )} */}
          {/* <QuatiteTable data={statsArray} /> */}
          <DatesCont
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <QuatiteTable data={quantityArray} />
          {/* <SwitchButtons
              options={["Achats", "Ventes"]}
              setSelected={setSelected}
              selected={selected}
            /> */}
          {/* {selected === "achats" ? ( */}
          <TableAchat columns={columnsAchats} rows={dataAchats} />
          {/* ) : (
            <TableVentes columns={columnsVentes} rows={dataVentes} />
          )} */}
        </div>
    </div>
  );
};

export default DetailsProduct;

const columnsAchats: (keyof IProductDetailsTable)[] = [
  "date",
  "référence",
  "ajouter par",
  // "produit",
  "client",
  "magasin",
  "quantité vendu",
  "total",
];
const createNewArrayAchats = (data: IProductDetails[]) => {
  return data.map((item: IProductDetails, index: number) => {
    return {
      ...item,
      id: index,
      // date: item.date,
      référence: item.code_bar,
      "ajouter par": item.created_by_user,
      // produit: item.name,
      client: item.client_name,
      magasin: item.entrepot_name,
      "quantité vendu": item.quantity_sold,
      // total: item.total,
    };
  });
};

// const data_test_achat = [
//   {
//     id: 1,
// user_invoice_number: string;
// invoice_number: string;
// provider_name: string;
// entrepot_name: string;
// quantity_declared: number;
// total: string;
//   },
// ];

// const statsArray_test = data_test_achat.map((item: any) => {
//   return {
//     magasin: item.entrepot.name,
//     quantité: item.produit.quantity,
//   };
// });

// const columnsVentes: (keyof ITableEntrepotVente)[] = [
//   "référence",
//   "nom_du_client",
//   "magasin",
//   "total",
//   "status",
// ];

// const data_test_ventes = [
//   {
//     id: 1,
//     code: "EV001",
//     client: {
//       id: 1,
//       code_client: "C001",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St, Anytown, USA",
//       status: "active",
//       total_purchases: "1000.00",
//       outstanding_balance: "200.00",
//       created_by: 201,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-01-01T10:00:00Z",
//       updated_at: "2023-01-01T10:00:00Z",
//     },
//     entrepot: {
//       id: 1,
//       name: "Warehouse A",
//       code_entreport: "WA123",
//       description: "Main warehouse for electronics",
//       created_by: 101,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-01-01T10:00:00Z",
//       updated_at: "2023-01-01T10:00:00Z",
//     },
//     total: 500,
//     status: "completed",
//     référence: "REF001",
//     nom_du_client: "John Doe",
//     magasin: "Warehouse A",
//   },
//   {
//     id: 2,
//     code: "EV002",
//     client: {
//       id: 2,
//       code_client: "C002",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       phone: "987-654-3210",
//       address: "456 Elm St, Othertown, USA",
//       status: "inactive",
//       total_purchases: "500.00",
//       outstanding_balance: "50.00",
//       created_by: 202,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-02-01T11:00:00Z",
//       updated_at: "2023-02-01T11:00:00Z",
//     },
//     entrepot: {
//       id: 2,
//       name: "Warehouse B",
//       code_entreport: "WB456",
//       description: "Secondary warehouse for furniture",
//       created_by: 102,
//       updated_by: null,
//       deleted_by: null,
//       created_at: "2023-02-01T11:00:00Z",
//       updated_at: "2023-02-01T11:00:00Z",
//     },
//     total: 300,
//     status: "pending",
//     référence: "REF002",
//     nom_du_client: "Jane Smith",
//     magasin: "Warehouse B",
//   },
// ];

// const createNewArrayVentes = (data: any) => {
//   return data.map((item: any) => {
//     return {
//       ...item,
//       référence: item.code,
//       nom_du_client: item.client.name,
//       magasin: item.entrepot.name,
//     };
//   });
// };
