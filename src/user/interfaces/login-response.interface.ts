export interface LoginResponse {
    user: {
      id: number;
      nombre: string;
      email: string;
    };
    token: string;
  }