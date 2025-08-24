import styles from './TasksList.module.scss';
import type { Task } from '../../pages/TodoListPage.tsx';
import { TaskItem } from '../TaskItem';

type Props = {
  tasksList: Task[];
  updateTaskList: () => void;
};

export const TasksList = ({ tasksList, updateTaskList }: Props) => {
  return (
    <div className={styles.tasksList}>
      {tasksList.map((task) => (
        <TaskItem key={task.id} {...task} updateTaskList={updateTaskList} />
      ))}
    </div>
  );
};
