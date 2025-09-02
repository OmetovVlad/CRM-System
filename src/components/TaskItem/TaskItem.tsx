import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './TasksItem.module.scss';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { deleteTask, updateTask } from '../../api';
import type { Todo } from '../../types';
import { IconButton } from '../../ui/IconButton';
import { Checkbox } from '../../ui/Checkbox';
import { validateTodoTitle } from '../../helpers/validateTodoTitle.ts';

interface TaskItemProps {
  task: Todo;
  updateTaskList: () => void;
}

export const TaskItem = ({ task: currentTask, updateTaskList }: TaskItemProps) => {
  const [task, setTask] = useState<Todo>(currentTask);
  const [prevDataTask, setPrevDataTask] = useState<Todo>(currentTask);

  const [isEdit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleUpdateTask = async (id: number, title: string, isDone: boolean) => {
    try {
      await updateTask(id, { title, isDone });
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      alert(myError.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      alert(myError.message);
    }
  };

  const handleCheckbox = () => {
    setTask((prev) => {
      if (!isEdit) {
        void handleUpdateTask(task.id, task.title, !prev.isDone);
      }

      return { ...prev, isDone: !prev.isDone };
    });
  };

  const handleStartEdit = () => {
    setPrevDataTask(task);
    setEdit(true);
  };

  const handleEndEdit = () => {
    setEdit(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: event.target.value });
  };

  const handleSave = (event: FormEvent) => {
    event.preventDefault();

    if (task !== prevDataTask) {
      const validationResult = validateTodoTitle(task.title);

      if (validationResult.error) {
        return setError(validationResult.error);
      }

      handleUpdateTask(task.id, validationResult.title, task.isDone);
    }

    setError('');
    handleEndEdit();
  };

  const handleCancel = () => {
    setTask(prevDataTask);
    setError('');
    handleEndEdit();
  };

  const classList = [styles.taskItem, task.isDone ? styles.complete : ''];

  return (
    <div className={classList.join(' ')}>
      <form onSubmit={handleSave}>
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}

        <Checkbox onChange={handleCheckbox} checked={task.isDone} />

        {!isEdit && <div className={styles.title}>{task.title}</div>}
        {isEdit && <input name="title" value={task.title} onChange={handleChangeTitle} />}

        <div className={styles.buttons}>
          {isEdit && (
            <>
              <IconButton variant={'success'} icon={<CheckIcon />} />
              <IconButton variant={'danger'} icon={<XMarkIcon />} onClick={handleCancel} />
            </>
          )}

          {!isEdit && (
            <>
              <IconButton icon={<PencilSquareIcon />} onClick={handleStartEdit} />
              <IconButton variant={'danger'} icon={<TrashIcon />} onClick={handleDelete} />
            </>
          )}
        </div>
      </form>
    </div>
  );
};
