import type { MetaResponse, Todo, TodoInfo, TodoRequest, Filter } from '../types';

const BASE_URL = 'https://easydev.club/api/v1';

export async function createNewTask(todoRequest: TodoRequest): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(todoRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to create new task');
    }

    return resData;
  } catch (e) {
    throw e as Error;
  }
}

export async function getTaskList(filter: Filter): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${filter}`);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to load tasks');
    }

    return resData;
  } catch (e) {
    throw e as Error;
  }
}

export async function deleteTask(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (e) {
    throw e as Error;
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to update tasks');
    }

    return resData;
  } catch (e) {
    throw e as Error;
  }
}
