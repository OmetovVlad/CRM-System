import { NewTask } from '../../components/NewTask';
import { createNewTask, deleteTask, getTaskList, updateTask } from '../../api/api.ts';
import { useEffect, useState } from 'react';
import { TasksList } from '../../components/TasksList';
import { TaskGroups } from '../../components/TaskGroups';

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
}

const Home = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [info, setInfo] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    async function fetchTasks() {
      try {
        return await getTaskList(filter);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTasks().then((res) => {
      setTasksList(res.data);
      setInfo(res.info);
      setIsLoading(false);
    });
  }, [filter]);

  useEffect(() => {
    const completed = tasksList.filter((task) => task.isDone).length;
    const inWork = tasksList.length - completed;
    setInfo({
      all: tasksList.length,
      completed: completed,
      inWork: inWork,
    });
  }, [tasksList]);

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const addNewTask = async (title: string) => {
    try {
      const newTask: Task = await createNewTask(title);
      setInfo({ ...info, all: info.all + 1, inWork: info.inWork + 1 });
      setTasksList((prev) => [...prev, newTask]);
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleUpdateTask = async (id: number, title: string, isDone: boolean) => {
    try {
      await updateTask(id, title, isDone);

      setTasksList(
        tasksList.map((item) => {
          return item.id === id ? { ...item, title, isDone } : item;
        }),
      );
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);

      setTasksList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setTasksList(tasksList);

      const myError = error as Error;
      console.log(myError.message);
    }
  };

  return (
    <>
      <h1>Todo List 📋</h1>
      <NewTask handleButton={addNewTask} />
      {isLoading && 'Loading...'}
      {!isLoading && (
        <>
          <TaskGroups filter={filter} info={info} setFilter={changeFilter} />
          <TasksList
            filter={filter}
            tasksList={tasksList}
            handleUpdateTask={handleUpdateTask}
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  );
};

export default Home;
