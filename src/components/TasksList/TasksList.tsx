import styles from './TasksList.module.scss';
import type { Task } from '../../pages/Home/Home.tsx';
import { TaskItem } from '../TaskItem';

type Tasks = {
  tasksList: Task[];
};

export const TasksList = ({ tasksList }: Tasks) => {
  return (
    <div className={styles.tasksList}>
      {tasksList.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};
