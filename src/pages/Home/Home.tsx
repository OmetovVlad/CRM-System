import { NewTask } from '../../components/NewTask';
import { createNewTask } from '../../api/api.ts';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
}

const Home = () => {
  const initialState: Task[] = [
    { id: 1, title: 'test', isDone: false, created: '2025-08-17T09:31:56.044667Z' },
  ];

  const [tasksList, setTasksList] = useState<Task[]>(initialState);

  const addNewTask = async (title: string) => {
    try {
      const newTask: Task = await createNewTask(title);

      setTasksList((prev) => [...prev, newTask]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Todo List 📋</h1>
      <NewTask handleButton={addNewTask} />
    </>
  );
};

export default Home;
