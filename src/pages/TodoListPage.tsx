import { NewTask } from '../components/NewTask';
import { getTaskList } from '../api';
import { useCallback, useEffect, useState } from 'react';
import { TasksList } from '../components/TasksList';
import { TaskGroups } from '../components/TaskGroups';
import type { TodoInfo } from '../types';

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created: string;
}

const TodoListPage = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await getTaskList(filter);

      if (res) {
        setTasksList(res.data);

        if (res.info) {
          setInfo(res.info);
        }
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

  return (
    <>
      <h1>Todo List 📋</h1>
      <NewTask updateTaskList={fetchData} />
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <TaskGroups filter={filter} info={info} setFilter={changeFilter} />
          {tasksList.length > 0 && <TasksList tasksList={tasksList} updateTaskList={fetchData} />}
        </>
      )}
    </>
  );
};

export default TodoListPage;
