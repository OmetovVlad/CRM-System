import { NewTask } from '../../components/NewTask';
import { createNewTask, deleteTask, getTaskList, updateTask } from '../../api/api.ts';
import { useCallback, useEffect, useState } from 'react';
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

  const fetchData = useCallback(async () => {
    try {
      const res = await getTaskList(filter);

      if (res) {
        setTasksList(res.data);
        setInfo(res.info);
      }
    } catch (error) {
      console.log(error);
    }
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [fetchData]);

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const addNewTask = async (title: string) => {
    try {
      await createNewTask(title);
      fetchData().then(() => {});
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleUpdateTask = async (id: number, title: string, isDone: boolean) => {
    try {
      await updateTask(id, title, isDone);
      fetchData().then(() => {});
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchData().then(() => {});
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
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <TaskGroups filter={filter} info={info} setFilter={changeFilter} />
          {tasksList.length > 0 && (
            <TasksList
              tasksList={tasksList}
              handleUpdateTask={handleUpdateTask}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
