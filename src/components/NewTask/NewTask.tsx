import styles from './NewTask.module.scss';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState, type ChangeEvent } from 'react';

type props = {
  handleButton: (title: string) => void;
};

export const NewTask = ({ handleButton }: props) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
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
        <button
          onClick={() => {
            handleButton(newTask);
          }}
        >
          <PlusCircleIcon />
          <span>Добавить</span>
        </button>
      </div>
    </header>
  );
};
