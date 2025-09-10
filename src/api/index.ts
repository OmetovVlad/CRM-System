import type { MetaResponse, Todo, TodoInfo, TodoRequest, Filter } from '../types';
import axios from 'axios';

const BASE_URL = 'https://easydev.club/api/v1';

export async function createNewTask(todoRequest: TodoRequest): Promise<Todo> {
  try {
    const response = await axios.post<Todo>(`${BASE_URL}/todos`, todoRequest);

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
    const response = await axios.get<MetaResponse<Todo, TodoInfo>>(
      `${BASE_URL}/todos?filter=${filter}`,
    );

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
    await axios.delete(`${BASE_URL}/todos/${id}`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to delete task');
    }
    throw e;
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, todo);
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || 'Failed to update task');
    }
    throw e;
  }
}
