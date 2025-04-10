import PageTitle from "../../components/ui/PageTitle";
import AchatTable from "../../containers/achat/achat/AchatTable";
import ButtonsCont from "../../containers/products/../achat/achat/ButtonsCont";
import { useEffect, useContext } from "react";
import IAchat from "../../types/achat";
import axios from "axios";
import { IAchatTable } from "../../types/achat";
import { createContext } from "react";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const AchatsContext = createContext<any>(null);

const url = import.meta.env.VITE_BASE_URL;
const fetchData = async (body: any) => { 
  const response = await axios.post<{ achats: IAchat[] }>(
    url + "/api/achats/filter/get",
    {
      ...(body.date && { date_start: body.date }),
      ...(body.endDate && { date_end: body.endDate }),
      ...(body.reference && { invoice_number: body.reference }),
      ...(body.userInvNumber && { user_invoice_number: body.userInvNumber }),
      ...(body.category && { category_id: body.category }),
      ...(body.provider && { provider_id: body.provider }),
      ...(body.magasin && { entrepot_id: body.magasin }),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const modicfiedData = modifiedAchats(response.data.achats);
  return modicfiedData;
}

const Achats = () => {
  const columns = columns_test;
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date_start") || "";
  const endDate = searchParams.get("date_end") || "";
  const reference = searchParams.get("invoice_number") || "";
  const userInvNumber = searchParams.get("user_invoice_number") || "";
  const category = searchParams.get("category") || "";
  const provider = searchParams.get("provider_id") || "";
  const magasin = searchParams.get("entrepot_id") || "";

  useEffect(() => {
    if (!privileges.entrées["Liste des entrées"]) navigate("/tableau-de-bord");
  }, []);

  const { data: achats, refetch } = useSuspenseQuery({
    queryKey: ["achats", location.search],
    queryFn: () =>
      fetchData({
        date,
        endDate,
        reference,
        userInvNumber,
        category,
        provider,
        magasin,
      }),
  })

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Liste des entrées" />
      <ButtonsCont data={achats} columns={columns} />
      <AchatTable rows={achats} columns={columns} refetch={refetch} />
    </div>
  );
};

export default Achats;

const columns_test: (keyof IAchatTable)[] = [
  "reference",
  "date",
  "fournisseur",
  "magasin",
  "total",
  "référence de l'utilisateur",
];

const modifiedAchats = (achats: IAchat[]) => {
  return achats.map((achat: IAchat) => {
    return {
      ...achat,
      date: new Date(achat.created_at).toLocaleDateString(),
      reference: achat.invoice_number,
      fournisseur: achat.provider.name,
      magasin: achat.entrepot.name,
      total: achat.total_cost,
      "référence de l'utilisateur": achat.user_invoice_number,
    };
  });
};
