import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  Filter,
  AuthData,
  UserRegistration,
  Token, UserFilters,
} from '../types';
import { apiInstance } from './apiInstance.ts';

function errorHandler(e: unknown): string {
  if ( e && typeof e === 'object') {
    const error = e as { response: {data?: string } };

    if (error.response?.data) {
      return error.response.data;
    }
  }

  return 'Unknown error';
}

export async function createNewTask(todoRequest: TodoRequest): Promise<Todo> {
  try {
    const response = await apiInstance.post<Todo>(`/todos`, todoRequest);

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getTaskList(filter: Filter): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await apiInstance.get<MetaResponse<Todo, TodoInfo>>('/todos', {
      params: { filter },
    });

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function deleteTask(id: number) {
  try {
    await apiInstance.delete(`/todos/${id}`);
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  try {
    const response = await apiInstance.put(`/todos/${id}`, todo);
    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function signin(signinData: AuthData): Promise<Token> {
  try {
    const response = await apiInstance.post(`/auth/signin`, signinData);
    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function signup(signupData: UserRegistration) {
  try {
    const response = await apiInstance.post(`/auth/signup`, signupData);
    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function profile() {
  try {
    const response = await apiInstance.get(`/user/profile`);
    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function logout() {
  try {
    const response = await apiInstance.post(`/user/logout`);

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}


export async function adminUsers(UserFilters: UserFilters) {
  console.log(UserFilters);

  try {
    const response = await apiInstance.get(`/admin/users`, {
      params: {
        search: UserFilters.search,
        page: UserFilters.page,
        limit: UserFilters.limit,
        sortBy: UserFilters.sortBy,
        sortOrder: UserFilters.sortOrder,
        isBlocked: UserFilters.isBlocked,
      }
    });

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function adminDeleteUser(userId: number) {
  try {
    const response = await apiInstance.delete(`/admin/users/${userId}`);

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function adminBlockUser(userId: number) {
  try {
    const response = await apiInstance.post(`/admin/users/${userId}/block`);

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function adminUnblockUser(userId: number) {
  try {
    const response = await apiInstance.post(`/admin/users/${userId}/unblock`);

    return response.data;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}
