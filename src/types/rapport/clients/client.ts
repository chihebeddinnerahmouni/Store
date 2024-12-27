export interface IClient {
    id: number;
    name: string;
    phone: string;
    total_number: number;
    total_money: number;

    // table
    client: string;
    téléphone: string;
    nombre_total: number;
    argent_total: number;
}

export interface IClientTable {
    client: string;
    téléphone: string;
    nombre_total: number;
    argent_total: number;
}

