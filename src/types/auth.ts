export interface User {
  id: number;
  email: string;
  first_name?: string;
  role?: string;
}

export interface UserCreate {
  email: string;
  password: string;
  first_name?: string;
  role?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user_id: number;
  role?: string;
}