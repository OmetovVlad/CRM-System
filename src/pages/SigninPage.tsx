import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type loginValues = {
  username: string;
  password: string;
};

const onFinish = (values: loginValues) => {
  console.log('Received values of form: ', values);
};

const SigninPage = () => {
  return (
    <Card title="Авторизоваться" variant="borderless" style={{ width: '100%', maxWidth: 400 }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            { required: true, message: 'Введите логин' },
            { min: 2, max: 60, message: 'Длинна логина от 2 до 60 символов' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Логин" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 6, max: 60, message: 'Длинна пароля от 6 до 60 символов' },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Войти
          </Button>
          или <Link to="/auth/signup">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SigninPage;
