import styles from './NewTask.module.scss';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState, type ChangeEvent } from 'react';
import { createNewTask } from '../../api';

type props = {
  updateTaskList: () => void;
};

export const NewTask = ({ updateTaskList }: props) => {
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  const addNewTask = async (title: string) => {
    try {
      await createNewTask({ title });
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      console.log(myError.message);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value.replace(/\s+/g, ' '));
  };

  const sendHandle = (title: string) => {
    title = title.trim();

    if (title.length < 2 || title.length > 64) {
      return setError('Задача должна быть не менее 2 и не более 64 символов.');
    }

    setError('');
    addNewTask(title);
    setNewTask('');
  };

  return (
    <header className={styles.newTask}>
      <div className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => handleInputChange(event)}
          placeholder={'Задача, которую нужно сделать...'}
        />
        <button onClick={() => sendHandle(newTask)}>
          <PlusCircleIcon />
          <span>Добавить</span>
        </button>
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}
      </div>
    </header>
  );
};
