import { memo } from 'react';
import { createNewTask } from '../../api';
import { Button } from '../../ui/Button';
import { PlusOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';

type props = {
  errorAlert: (message: string) => void;
  updateTaskList: () => void;
};

export const NewTask = memo(({ errorAlert, updateTaskList }: props) => {
  const [form] = useForm();

  const handleCreateTask = async (values: { title: string }) => {
    const { title } = values;

    try {
      await createNewTask({ title });
      updateTaskList();
    } catch (error) {
      const myError = error as Error;
      errorAlert(myError.message);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      <Form form={form} onFinish={handleCreateTask} layout="horizontal">
        <Title level={5} style={{ marginTop: 0 }}>
          Создать задачу
        </Title>
        <Flex gap="middle">
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
            style={{ flex: 1 }}
          >
            <Input placeholder="Задача, которую нужно сделать..." size="large" />
          </Form.Item>

          <Button icon={<PlusOutlined />} htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </ConfigProvider>
  );
});
