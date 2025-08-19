import styles from './TasksList.module.scss';
import type { Task } from '../../pages/Home/Home.tsx';
import { TaskItem } from '../TaskItem';

type Props = {
  filter: string;
  tasksList: Task[];
  handleDelete: (index: number) => void;
  handleUpdateTask: (id: number, title: string, isDone: boolean) => void;
};

export const TasksList = ({ filter, tasksList, handleDelete, handleUpdateTask }: Props) => {
  function isTaskVisible(task: Task) {
    switch (filter) {
      case 'completed':
        return task.isDone;
      case 'inWork':
        return !task.isDone;
      case 'all':
      default:
        return true;
    }
  }

  const taskListFiltered = tasksList.filter((item: Task) => isTaskVisible(item));

  return (
    <div className={styles.tasksList}>
      {taskListFiltered.map((task) => (
        <TaskItem
          key={task.id}
          handleUpdateTask={handleUpdateTask}
          handleDelete={handleDelete}
          {...task}
        />
      ))}
    </div>
  );
};
