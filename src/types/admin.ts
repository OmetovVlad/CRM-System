// Интерфейс запроса для фильтрации и сортировки пользователей
import { Role } from './auth.ts';

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;  // сколько на странице
  page?: number;  // страницу
}

// Интерфейс пользователя
export interface Admin {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}
// Интерфейс метаинформации

export interface AdminMetaResponse<T> {
  data: T[]
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  roles: Role[];
}

// Интерфейс для обновления данных пользователя
export interface UserRequest{
  username?: string;
  email?: string;
  phoneNumber?: string;
}