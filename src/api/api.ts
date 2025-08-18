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

export async function getTaskList() {
  const response = await fetch('https://easydev.club/api/v1/todos');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to load tasks');
  }

  return resData;
}
