export async function createNewTask(title: string) {
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

export async function getTaskList(filter: string) {
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

export async function updateTask(id: number, title: string, isDone: boolean) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ isDone: isDone, title: title }),
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
