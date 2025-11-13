import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  Filter,
  AuthData,
  UserRegistration,
  Token,
} from '../types';
import axios from 'axios';
import { instance } from './instance.ts';

export async function createNewTask(todoRequest: TodoRequest): Promise<Todo> {
  try {
    const response = await instance.post<Todo>(`/todos`, todoRequest);

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to create new task');
    }

    throw e;
  }
}

export async function getTaskList(filter: Filter): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await instance.get<MetaResponse<Todo, TodoInfo>>('/todos', {
      params: { filter },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to get tasks');
    }

    throw e;
  }
}

export async function deleteTask(id: number) {
  try {
    await instance.delete(`/todos/${id}`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to delete task');
    }
    throw e;
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  try {
    const response = await instance.put(`/todos/${id}`, todo);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to update task');
    }
    throw e;
  }
}

export async function signin(signinData: AuthData): Promise<Token> {
  try {
    const response = await instance.post(`/auth/signin`, signinData);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.response?.data || 'Failed to create new signin');
      throw new Error(e.response?.data || 'Failed to login');
    }
    throw e;
  }
}

export async function signup(signupData: UserRegistration) {
  try {
    const response = await instance.post(`/auth/signup`, signupData);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to signup');
    }
    throw e;
  }
}

export async function profile() {
  try {
    const response = await instance.get(`/user/profile`);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to get profile');
    }
    throw e;
  }
}

export async function logout() {
  try {
    const response = await instance.post(`/user/logout`);

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data || 'Failed to logout');
    }
    throw e;
  }
}
