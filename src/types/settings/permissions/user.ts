export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string | null;
    department: string | null;
    job_title: string | null;
    employee_id: string | null;
    address: string | null;
    status: string;
    date_of_joining: string | null;
    last_login: string | null;
    profile_picture: string | null;
    created_by: string | null;
    created_at: string;
    updated_at: string;
}


