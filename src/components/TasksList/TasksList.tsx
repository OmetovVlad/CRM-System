import styles from './TasksList.module.scss';
import type { Task } from '../../pages/Home/Home.tsx';
import { TaskItem } from '../TaskItem';

type Props = {
  tasksList: Task[];
  handleDelete: (index: number) => void;
  handleUpdateTask: (id: number, title: string, isDone: boolean) => void;
};

export const TasksList = ({ tasksList, handleDelete, handleUpdateTask }: Props) => {
  return (
    <div className={styles.tasksList}>
      {tasksList.map((task) => (
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
