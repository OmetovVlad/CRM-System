import { TaskItem } from '../TaskItem';
import type { Todo } from '../../types';
import { Flex } from 'antd';

type Props = {
  tasksList: Todo[];
  errorAlert: (message: string) => void;
  updateTaskList: () => void;
};

export const TasksList = ({ tasksList, errorAlert, updateTaskList }: Props) => {
  return (
    <Flex gap="middle" vertical>
      {tasksList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          errorAlert={errorAlert}
          updateTaskList={updateTaskList}
        />
      ))}
    </Flex>
  );
};
