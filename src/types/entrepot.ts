interface IWarehouse {
  id: number;
  name: string;
  code_entreport: string;
  description: string;
  created_by: number;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
}

export default IWarehouse;