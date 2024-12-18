import PageTitle from "../../components/ui/PageTitle";
import ProductsTable from "../../containers/products/products/ProductsTable";


const Products = () => {
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
          <PageTitle text="Liste de produits" />
          {/* <div className="cardCss"> */}
             <ProductsTable 
              rows={data}
              columns={columns}
          /> 
          {/* </div> */}
          
    </div>
  );
}

export default Products


const columns = ["designation", "code", "marque", "categorie", "cout", "prix", "unité", "quantité", "actions"];

const data = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    type: "single",
    designation: "Apple",
    code: "9876543210",
    marque: "FreshFarms",
    categorie: "Fruits",
    cout: "200.00",
    prix: "50.00",
    unité: "Kg",
    quantité: "25",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2016/08/02/22/54/beer-1567315_960_720.jpg",
    type: "pack",
    designation: "Beer",
    code: "4567891230",
    marque: "BrewKing",
    categorie: "Beverages",
    cout: "1200.00",
    prix: "300.00",
    unité: "Carton",
    quantité: "8",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/04/15/cheese-1868746_960_720.jpg",
    type: "single",
    designation: "Cheese",
    code: "3210987654",
    marque: "DairyDelight",
    categorie: "Dairy",
    cout: "500.00",
    prix: "120.00",
    unité: "Kg",
    quantité: "15",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2017/01/20/15/06/bread-1998650_960_720.jpg",
    type: "pack",
    designation: "Bread",
    code: "1234098765",
    marque: "BakeHouse",
    categorie: "Bakery",
    cout: "150.00",
    prix: "30.00",
    unité: "Loaf",
    quantité: "50",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
    type: "single",
    designation: "Orange Juice",
    code: "5678901234",
    marque: "JuicyFresh",
    categorie: "Beverages",
    cout: "400.00",
    prix: "80.00",
    unité: "Litre",
    quantité: "20",
  },
];
