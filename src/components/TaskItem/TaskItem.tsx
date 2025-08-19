import type { Task } from '../../pages/Home/Home.tsx';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import styles from './TasksItem.module.scss';
import { type ChangeEvent, useState } from 'react';

type Props = {
  handleDelete: (id: number) => void;
  handleUpdateTask: (id: number, title: string, isDone: boolean) => void;
} & Task;

export const TaskItem = ({ handleUpdateTask, handleDelete, id, title, isDone }: Props) => {
  const [task, setTask] = useState({
    id: id,
    title: title,
    isDone: isDone,
  });

  const [prevDataTask, setPrevDataTask] = useState({
    id: id,
    title: title,
    isDone: isDone,
  });

  const [isEdit, setEdit] = useState(false);

  const checkboxHandler = () => {
    setTask((prev) => {
      const updated = { ...prev, isDone: !prev.isDone };

      if (!isEdit) {
        handleUpdateTask(task.id, task.title, !prev.isDone);
      }

      return updated;
    });
  };

  const editButtonHandler = () => {
    setPrevDataTask(task);
    setEdit((prev) => !prev);
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, title: event.target.value });
  };

  const handleSave = () => {
    if (task !== prevDataTask) {
      handleUpdateTask(task.id, task.title, task.isDone);
    }
    editButtonHandler();
  };

  const handleCancel = () => {
    setTask(prevDataTask);
    editButtonHandler();
  };

  return (
    <div className={styles.taskItem}>
      <label className={styles.checkbox}>
        <input type="checkbox" onChange={checkboxHandler} checked={task.isDone} />
        <div>
          <CheckCircleIcon className={styles.checked} />
        </div>
      </label>

      <div className={styles.title}>
        {isEdit && <textarea value={task.title} onChange={(event) => changeTitleHandler(event)} />}
        {!isEdit && task.title}
      </div>

      <div className={styles.buttons}>
        {isEdit && (
          <>
            <button className={styles.green} onClick={handleSave}>
              <CheckIcon />
            </button>

            <button className={styles.red} onClick={handleCancel}>
              <XMarkIcon />
            </button>
          </>
        )}

        {!isEdit && (
          <>
            <button onClick={editButtonHandler}>
              <PencilSquareIcon />
            </button>

            <button className={styles.red} onClick={() => handleDelete(id)}>
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
