import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '../types';

export async function createNewTask({ title }: TodoRequest): Promise<Todo> {
  const response = await fetch('https://easydev.club/api/v1/todos', {
    method: 'POST',
    body: JSON.stringify({ title: title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to create new task');
  }

  return resData;
}

export async function getTaskList(filter: string): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to load tasks');
  }

  return resData;
}

export async function deleteTask(id: number) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}

export async function updateTask(id: number, todo: TodoRequest): Promise<Todo> {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
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
}
