import { TaskItem } from '../TaskItem';
import type { Todo } from '../../types';
import { Flex } from 'antd';

type Props = {
  tasksList: Todo[];
  updateTaskList: () => void;
};

export const TasksList = ({ tasksList, updateTaskList }: Props) => {
  return (
    <Flex gap="middle" vertical>
      {tasksList.map((task) => (
        <TaskItem key={task.id} task={task} updateTaskList={updateTaskList} />
      ))}
    </Flex>
  );
};
