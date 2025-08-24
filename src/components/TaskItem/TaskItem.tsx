import type { Task } from '../../pages/TodoListPage.tsx';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import styles from './TasksItem.module.scss';
import { type ChangeEvent, useState } from 'react';
import { deleteTask, updateTask } from '../../api';

interface TaskItemProps extends Task {
  updateTaskList: () => void;
}

export const TaskItem = ({ id, title, isDone, updateTaskList }: TaskItemProps) => {
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
  const [error, setError] = useState('');

  const handleUpdateTask = async (id: number, title: string, isDone: boolean) => {
    try {
      await updateTask(id, { title, isDone });
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const checkboxHandler = () => {
    setTask((prev) => {
      if (!isEdit) {
        handleUpdateTask(task.id, task.title, !prev.isDone);
      }

      return { ...prev, isDone: !prev.isDone };
    });
  };

  const editButtonHandler = () => {
    setPrevDataTask(task);
    setEdit((prev) => !prev);
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const title = event.target.value.replace(/\s+/g, ' ');

    setTask({ ...task, title: title });
  };

  const handleSave = () => {
    if (task !== prevDataTask) {
      if (task.title.trim().length < 2 || task.title.trim().length > 64) {
        return setError('Задача должна быть не менее 2 и не более 64 символов.');
      }

      handleUpdateTask(task.id, task.title, task.isDone);
    }

    setError('');
    editButtonHandler();
  };

  const handleCancel = () => {
    setTask(prevDataTask);
    editButtonHandler();
  };

  return (
    <div className={styles.taskItem}>
      {error && (
        <div className={styles.error}>
          <span>{error}</span>
        </div>
      )}

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
