// src/types/auth.ts
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  // Outros campos do usuário que podem vir do backend
}

export interface AuthResponse {
  user: User;
  token: string;
}