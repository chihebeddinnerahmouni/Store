// interface IProductCommandeItem {
//     id: number;
//     name: string;
//     cout_unitaire: number;
//     stock_actuel: number;
//     taxe: number;
//     quantite: number;
//     grand_total: number;
//     alert_stock: number;
//     unité: string;
// }

// interface Props {
//     // taxe: string;
//     productsCommandeArray: IProductCommandeItem[];
// }

// const TotalCont = ({
//   // taxe,
//   productsCommandeArray
// }: Props) => {
//     const primaryPrice = productsCommandeArray.reduce(
//         (acc, item) => acc + item.grand_total,
//         0
//     );

//     const taxValue = (primaryPrice * Number(taxe)) / 100;
//     const total = primaryPrice + taxValue ;

//     return (
//       <section className="cardCss flex flex-col lg:gap-2 xl:min-w-[500px] xl:sticky xl:top-[100px]">
//         <div className="flex justify-between p-2 bg-gray-100 rounded">
//           <span>Taxe de commande</span>
//           <span>
//             {taxValue.toFixed(2)} DA ({taxe}%)
//           </span>
//         </div>
//         <div className="flex justify-between p-2 bg-white font-bold">
//           <span>Total</span>
//           <span>{total.toFixed(2)} DA</span>
//         </div>
//       </section>
//     );
// };

// export default TotalCont;
// with taxe included

interface IProductCommandeItem {
    id: number;
    name: string;
    cout_unitaire: number;
    stock_actuel: number;
    taxe: number;
    quantite: number;
    grand_total: number;
    alert_stock: number;
    unité: string;
}

interface Props {
    productsCommandeArray: IProductCommandeItem[];
}

const TotalCont = ({
  productsCommandeArray
}: Props) => {
    const primaryPrice = productsCommandeArray.reduce(
        (acc, item) => acc + item.grand_total,
        0
    );

    return (
      <section className="cardCss flex flex-col lg:gap-2 xl:min-w-[500px] xl:sticky xl:top-[100px]">
        <div className="flex justify-between p-2 bg-white font-bold">
          <span>Total</span>
          <span>{primaryPrice.toFixed(2)} DA</span>
        </div>
      </section>
    );
};

export default TotalCont;