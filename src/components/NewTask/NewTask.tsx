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

  const sendHandle = (title: string) => {
    if (title.length < 2 || title.length > 64) {
      return console.log('Задача должна быть больше 2 и не более 64 символов.');
    }

    handleButton(title);
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
      </div>
    </header>
  );
};
