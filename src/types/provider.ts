export interface IProvider {
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
