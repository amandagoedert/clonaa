// src/api/auth.ts
import { AuthResponse, User } from '@/types/auth';

// Funcao simulada para login
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@clonaa.com' && password === 'admin123') {
        resolve({
          user: { id: 'admin-id-123', email: 'admin@clonaa.com', name: 'Admin User', role: 'admin' },
          token: 'fake-admin-jwt-token',
        });
      } else if (email === 'user@clonaa.com' && password === 'user123') {
        resolve({
          user: { id: 'user-id-456', email: 'user@clonaa.com', name: 'Regular User', role: 'user' },
          token: 'fake-user-jwt-token',
        });
      } else {
        reject(new Error('Credenciais invalidas'));
      }
    }, 1500);
  });
};

// Funcao simulada para registro
export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'existing@clonaa.com') {
        reject(new Error('Email ja registrado'));
      } else {
        resolve({
          user: { id: `new-user-${Date.now()}`, email, name, role: 'user' },
          token: `fake-new-user-jwt-token-${Date.now()}`,
        });
      }
    }, 1500);
  });
};

// Funcao simulada para reset de senha
export const forgotPassword = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Email de reset de senha enviado para: ${email}`);
      resolve();
    }, 1500);
  });
};

// Funcao simulada para trocar senha
export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Senha alterada com sucesso");
            resolve();
        }, 1500);
    });
};