import styles from './NewTask.module.scss';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState, type ChangeEvent, type FormEvent, memo } from 'react';
import { createNewTask } from '../../api';
import { Button } from '../../ui/Button';
import { validateTodoTitle } from '../../helpers/validateTodoTitle.ts';

type props = {
  updateTaskList: () => void;
};

export const NewTask = memo(({ updateTaskList }: props) => {
  const [newTask, setNewTask] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();

    const validationResult = validateTodoTitle(newTask);

    if (validationResult.error) {
      setNewTask(validationResult.title);
      return setError(validationResult.error);
    }

    try {
      await createNewTask({ title: validationResult.title });
      updateTaskList();
      setError('');
      setNewTask('');
    } catch (error) {
      const myError = error as Error;
      alert(myError.message);
    }
  };

  return (
    <div className={styles.newTask}>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          name="title"
          type="text"
          minLength={2}
          maxLength={64}
          value={newTask}
          onChange={handleInputChange}
          placeholder={'Задача, которую нужно сделать...'}
        />

        <Button icon={<PlusCircleIcon />}>
          <span>Добавить</span>
        </Button>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
});
