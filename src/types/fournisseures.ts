interface IFournisseures {
  // id: number;
  // nom: string;
  // téléphone: string;
  //   email: string;
  //   wilaya: string;
  //   numéro_de_tva: string;
  //   dette_dachat_total: number;
  //   total_dette: number;

  id: number;
  code_provider: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  total_supplies: string;
  amount_paid: string;
  outstanding_balance: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

export default IFournisseures;
