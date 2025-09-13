import { memo } from 'react';
import { createNewTask } from '../../api';
import { Button } from '../../ui/Button';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { Todo } from '../../types';

type props = {
  notificationError: (message: string) => void;
  updateTaskList: () => void;
};

type CreateTodoRequest = Pick<Todo, 'title'>;

export const NewTask = memo(({ notificationError, updateTaskList }: props) => {
  const TITLE_MIN = Number(import.meta.env.VITE_TITLE_MIN);
  const TITLE_MAX = Number(import.meta.env.VITE_TITLE_MAX);

  const [form] = useForm();

  const handleCreateTask = async (values: CreateTodoRequest) => {
    const { title } = values;

    try {
      await createNewTask({ title });
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  };

  return (
    <Form form={form} onFinish={handleCreateTask} layout="horizontal">
      <Flex gap="middle">
        <Form.Item
          name="title"
          rules={[
            { required: true, message: 'Задача не может быть пустой' },
            {
              transform: (value) => value?.trim(),
              min: TITLE_MIN,
              message: `Минимум ${TITLE_MIN} символа`,
            },
            {
              transform: (value) => value?.trim(),
              max: TITLE_MAX,
              message: `Максимум ${TITLE_MAX} символа`,
            },
          ]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Задача, которую нужно сделать..." size="large" />
        </Form.Item>

        <Button icon={<PlusOutlined />} htmlType="submit">
          Добавить
        </Button>
      </Flex>
    </Form>
  );
});
