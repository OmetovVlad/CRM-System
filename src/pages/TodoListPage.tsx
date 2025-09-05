import { NewTask } from '../components/NewTask';
import { getTaskList } from '../api';
import { useCallback, useEffect, useState } from 'react';
import { TasksList } from '../components/TasksList';
import { TaskGroups } from '../components/TaskGroups';
import type { Filter, Todo, TodoInfo } from '../types';

const TodoListPage = () => {
  const [tasksList, setTasksList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>('all');
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
      const myError = error as Error;
      alert(myError.message);
    }
  }, [filter]);

  useEffect(() => {
    /* Спросить: как лучше писать */

    // (async () => {
    //   setIsLoading(true);
    //
    //   try {
    //     await fetchData();
    //   } catch (error) {
    //     const myError = error as Error;
    //     alert(myError.message);
    //   }
    //
    //   setIsLoading(false);
    // })();

    const load = async () => {
      setIsLoading(true);

      try {
        await fetchData();
      } catch (error) {
        const myError = error as Error;
        alert(myError.message);
      }

      setIsLoading(false);
    };

    void load();
  }, [fetchData]);

  return (
    <>
      <h1>Todo List 📋</h1>
      <NewTask updateTaskList={fetchData} />
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <TaskGroups filter={filter} info={info} setFilter={setFilter} />
          {!!tasksList.length && <TasksList tasksList={tasksList} updateTaskList={fetchData} />}
        </>
      )}
    </>
  );
};

export default TodoListPage;
