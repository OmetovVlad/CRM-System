import { NewTask } from '../../components/NewTask';
import { createNewTask, getTaskList } from '../../api/api.ts';
import { useEffect, useState } from 'react';
import { TasksList } from '../../components/TasksList';

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
}

const Home = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchTasks() {
      try {
        return await getTaskList();
      } catch (error) {
        console.log(error);
      }
    }

    fetchTasks().then((res) => {
      setTasksList(res.data);
      setIsLoading(false);
    });
  }, []);

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
      {isLoading && 'Loading...'}
      <TasksList tasksList={tasksList} />
    </>
  );
};

export default Home;
