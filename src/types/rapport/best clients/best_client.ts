export interface IBestClient {
    client_id: number;
    client_name: string;
    client_phone: string;
    total_ventes: number;
    total_sales_cost: number,

    // table
    id: number;
    client: string;
    téléphone: string;
    "total ventes": number;
    "montant total": number;
}

export interface IBestClientTable {
    id: number;
    client: string;
    téléphone: string;
    "total ventes": number;
    "montant total": number;

}