import type { Task } from '../../pages/Home/Home.tsx';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import styles from './TasksItem.module.scss';
import { useState } from 'react';

export const TaskItem = ({ title, isDone }: Task) => {
  const [isChecked, setChecked] = useState(isDone);
  const [isEdit, setEdit] = useState(false);

  const checkboxHandler = () => {
    setChecked((prev) => !prev);
  };

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className={styles.taskItem}>
      <label className={styles.checkbox}>
        <input type="checkbox" onChange={checkboxHandler} checked={isChecked} />
        <div>
          <CheckCircleIcon className={styles.checked} />
        </div>
      </label>

      <div className={styles.title}>
        {isEdit && <textarea value={title} />}
        {!isEdit && title}
      </div>

      <div className={styles.buttons}>
        {isEdit && (
          <>
            <button className={styles.green}>
              <CheckIcon />
            </button>

            <button className={styles.red} onClick={editHandler}>
              <XMarkIcon />
            </button>
          </>
        )}

        {!isEdit && (
          <>
            <button onClick={editHandler}>
              <PencilSquareIcon />
            </button>

            <button className={styles.red}>
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
