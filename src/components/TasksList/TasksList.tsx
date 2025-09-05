import styles from './TasksList.module.scss';
import { TaskItem } from '../TaskItem';
import type { Todo } from '../../types';

type Props = {
  tasksList: Todo[];
  updateTaskList: () => void;
};

export const TasksList = ({ tasksList, updateTaskList }: Props) => {
  return (
    <div className={styles.tasksList}>
      {tasksList.map((task) => (
        <TaskItem key={task.id} task={task} updateTaskList={updateTaskList} />
      ))}
    </div>
  );
};
