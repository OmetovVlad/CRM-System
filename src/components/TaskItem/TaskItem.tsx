import { useState } from 'react';
import { deleteTask, updateTask } from '../../api';
import type { Todo } from '../../types';
import { IconButton } from '../../ui/IconButton';
import { Checkbox } from '../../ui/Checkbox';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, ConfigProvider, Flex, Form, Input, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface TaskItemProps {
  task: Todo;
  updateTaskList: () => void;
}

export const TaskItem = ({ task: currentTask, updateTaskList }: TaskItemProps) => {
  const [form] = useForm();

  const [isEdit, setEdit] = useState<boolean>(false);

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
      await deleteTask(currentTask.id);
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      alert(myError.message);
    }
  };

  const handleCheckbox = () => {
    void handleUpdateTask(currentTask.id, currentTask.title, !currentTask.isDone);
  };

  const handleStartEdit = () => {
    form.resetFields();
    setEdit(true);
  };

  const handleEndEdit = () => {
    setEdit(false);
  };

  const handleSave = (values: { title: string; isDone: boolean }) => {
    const { title, isDone } = values;
    void handleUpdateTask(currentTask.id, title, isDone);

    handleEndEdit();
  };

  const handleCancel = () => {
    handleEndEdit();
  };

  return (
    <Card>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={{
            title: currentTask.title,
            isDone: currentTask.isDone,
          }}
          layout="horizontal"
        >
          <Flex gap="middle" align={'center'}>
            <Form.Item name="isDone" valuePropName="checked">
              <Checkbox onChange={handleCheckbox} />
            </Form.Item>

            {!isEdit && <div style={{ flex: 1 }}>{currentTask.title}</div>}
            {isEdit && (
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: 'Задача не может быть пустой' },
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length >= 2) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('Минимум 2 символа'));
                    },
                  },
                  { max: 64, message: 'Максимум 64 символа' },
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
      </ConfigProvider>
    </Card>
  );
};
