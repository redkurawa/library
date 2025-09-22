export interface UserResto {
  id: string;
  name: string;
  token: string;
}

// gemini types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: any;
}

export interface LoginPayload {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
