import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { IVenteSingleTable, IProduct, IClient, IEntrepot } from "../../types/venteSingle";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import InfosCont from "../../containers/vente/vente details/infosCont";
import PageTitle from "../../components/ui/PageTitle";
import Table from "../../containers/vente/vente details/Table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VenteDetails = () => {
  const { venteId } = useParams<{ venteId: string }>();
  const [client, setClient] = useState<IClient | null>(null);
  const [entrepot, setEntrepot] = useState<IEntrepot | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<string>("");

  const pdfRef = useRef<HTMLDivElement>(null);

  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    axios
      .get(`${url}/api/vente/${venteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const newData = ModifiedData(res.data.vente.products);
        setProducts(newData);
        setTotal(res.data.vente.total_cost);
        setClient(res.data.vente.client);
        setEntrepot(res.data.vente.entrepot);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, [venteId]);

  const exportToPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`vente-${venteId}.pdf`);
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Détails d'un sortie" />

      <div className="flex justify-end mb-6">
        <button
          onClick={exportToPDF}
          className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition"
        >
          Exporter en PDF
        </button>
      </div>

      <InfosCont clientData={client} entrepotData={entrepot} total={total} />
      <Table rows={products} columns={columns} />

      {/* Modern styled PDF content */}
      <div
        ref={pdfRef}
        dir="rtl"
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          color: "#333",
          padding: "40px",
          width: "800px",
          margin: "50px auto",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img
            src="/logo.jpeg"
            alt="Logo"
            style={{ width: "80px", height: "auto", objectFit: "contain" }}
          />
          <h2 style={{ textAlign: "center", flexGrow: 1, marginRight: "20px", fontSize: "24px" }}>
            تفاصيل البيع
          </h2>
        </div>

        <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

        <div style={{ marginBottom: "20px", fontSize: "14px", lineHeight: "1.8" }}>
          <p><strong>العميل:</strong> {client?.name}</p>
          <p><strong>المخزن:</strong> {entrepot?.name}</p>
          <p><strong>التاريخ:</strong> {new Date().toLocaleDateString("fr-FR")}</p>
          <p><strong>المجموع:</strong> {total} DA</p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "13px",
            textAlign: "center",
            border: "1px solid #ccc",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f7f7f7" }}>
              <th style={headerStyle}>الرمز</th>
              <th style={headerStyle}>المنتج</th>
              <th style={headerStyle}>السعر</th>
              <th style={headerStyle}>الكمية</th>
              <th style={headerStyle}>الضريبة</th>
              <th style={headerStyle}>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td style={cellStyle}>{p.code}</td>
                <td style={cellStyle}>{p.produit}</td>
                <td style={cellStyle}>{p.prix_unitaire} DA</td>
                <td style={cellStyle}>{p.quantité}</td>
                <td style={cellStyle}>{p.tax}%</td>
                <td style={cellStyle}>{p.grand_total} DA</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#777" }}>
          <p>بلدية سطيف</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default VenteDetails;

const headerStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  fontWeight: "bold",
  borderRadius: "4px 4px 0 0",
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

const columns: (keyof IVenteSingleTable)[] = [
  "code",
  "produit",
  "prix_unitaire",
  "quantité",
  "tax",
  "grand_total",
];

const ModifiedData = (data: IProduct[]) => {
  return data.map((item) => ({
    ...item,
    id: item.id,
    produit: item.name,
    quantité: item.pivot.quantity_sold,
    grand_total: item.pivot.subtotal,
    tax: item.pivot.tax,
    prix_unitaire: item.pivot.unit_price,
    code: item.code_barre,
  }));
};
