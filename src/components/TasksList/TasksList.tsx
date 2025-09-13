import { TaskItem } from '../TaskItem';
import type { Todo } from '../../types';
import { Flex } from 'antd';

type Props = {
  tasksList: Todo[];
  notificationError: (message: string) => void;
  updateTaskList: () => void;
};

export const TasksList = ({ tasksList, notificationError, updateTaskList }: Props) => {
  return (
    <Flex gap="middle" vertical>
      {tasksList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          notificationError={notificationError}
          updateTaskList={updateTaskList}
        />
      ))}
    </Flex>
  );
};
