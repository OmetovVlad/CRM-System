import { type ChangeEvent, useState } from 'react';
import { deleteTask, updateTask } from '../../api';
import type { Todo, UpdateTodoRequest } from '../../types';
import { IconButton } from '../../ui/IconButton';
import { Checkbox } from '../../ui/Checkbox';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Flex, Form, Input, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface TaskItemProps {
  task: Todo;
  notificationError: (message: string) => void;
  updateTaskList: () => void;
}

export const TaskItem = ({ task, notificationError, updateTaskList }: TaskItemProps) => {
  const TITLE_MIN = Number(import.meta.env.VITE_TITLE_MIN);
  const TITLE_MAX = Number(import.meta.env.VITE_TITLE_MAX);

  const [form] = useForm();

  const [isEdit, setEdit] = useState<boolean>(false);

  const saveTaskChanges = async (values: UpdateTodoRequest) => {
    try {
      await updateTask(task.id, values);
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  };

  const handleCheckbox = async (event: ChangeEvent<HTMLInputElement>) => {
    await saveTaskChanges({ isDone: event.target.checked });
  };

  const handleStartEdit = () => {
    setEdit(true);
  };

  const handleEndEdit = () => {
    setEdit(false);
  };

  const handleSave = async (values: UpdateTodoRequest) => {
    const { title, isDone } = values;
    await saveTaskChanges({ title, isDone });

    handleEndEdit();
  };

  const handleCancel = () => {
    form.resetFields();
    handleEndEdit();
  };

  return (
    <Card>
      <Form form={form} onFinish={handleSave} initialValues={{ ...task }} layout="horizontal">
        <Flex gap="middle" align={'center'}>
          <Form.Item name="isDone" valuePropName="checked">
            <Checkbox onChange={(event) => handleCheckbox(event)} />
          </Form.Item>

          {!isEdit && <div style={{ flex: 1 }}>{task.title}</div>}
          {isEdit && (
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
              required={true}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          )}

          <div>
            {isEdit && (
              <Space.Compact block>
                <IconButton color={'cyan'} icon={<CheckOutlined />} htmlType="submit" />
                <IconButton color={'danger'} icon={<CloseOutlined />} onClick={handleCancel} />
              </Space.Compact>
            )}

            {!isEdit && (
              <Space.Compact block>
                <IconButton color={'primary'} icon={<EditOutlined />} onClick={handleStartEdit} />
                <IconButton color={'danger'} icon={<DeleteOutlined />} onClick={handleDelete} />
              </Space.Compact>
            )}
          </div>
        </Flex>
      </Form>
    </Card>
  );
};
