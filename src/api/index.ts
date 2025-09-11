import type { MetaResponse, Todo, TodoInfo, TodoRequest, Filter } from '../types';
import axios from 'axios';
import { api } from './instance.ts';

export async function createNewTask(todoRequest: TodoRequest): Promise<Todo> {
  try {
    const response = await api.post<Todo>(`/todos`, todoRequest);

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to create new task');
    }

    throw e;
  }
}

export async function getTaskList(filter: Filter): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await api.get<MetaResponse<Todo, TodoInfo>>('/todos', {
      params: { filter },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to get tasks');
    }

    throw e;
  }
}

export async function deleteTask(id: number) {
  try {
    await api.delete(`/todos/${id}`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to delete task');
    }
    throw e;
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  try {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to update task');
    }
    throw e;
  }
}
