import { getTaskList } from '../api';
import { useCallback, useEffect, useState } from 'react';
import { TasksList } from '../components/TasksList';
import { TaskFilter } from '../components/TaskFilter';
import type { Filter, Todo, TodoInfo } from '../types';
import { Empty, Flex, Spin } from 'antd';
import { NewTask } from '../components/NewTask';

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

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <>
      <NewTask updateTaskList={fetchData} />
      {isLoading && (
        <Flex align={'center'} justify={'center'} style={{ margin: '2em 0' }}>
          <Spin size="large" />
        </Flex>
      )}
      {!isLoading && (
        <>
          <TaskFilter filter={filter} info={info} setFilter={setFilter} />
          {!!tasksList.length && <TasksList tasksList={tasksList} updateTaskList={fetchData} />}
          {!tasksList.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<p>Список задач пуст</p>}
              style={{ margin: '1em 0 0' }}
            />
          )}
        </>
      )}
    </>
  );
};

export default TodoListPage;
