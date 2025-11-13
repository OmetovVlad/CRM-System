import { Alert, Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signin } from '../api';
import type { AuthData } from '../types';
import { useState } from 'react';
import { tokenManager } from '../utils/TokenManager.ts';
import { useAppDispatch } from '../hooks/redux.ts';
import { login } from '../store/reducers/AuthSlice.ts';

interface Props {
  notificationError: (message: string) => void;
  notificationInfo: (message: string) => void;
}

const SigninPage = ({ notificationError, notificationInfo }: Props) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();

  const onFinish = async (values: AuthData) => {
    setIsSending(true);

    try {
      const signinData = await signin(values);

      notificationInfo('Вы успешно вошли в систему');
      setErrorMessage('');

      tokenManager.setToken(signinData.accessToken);
      localStorage.setItem('refreshToken', signinData.refreshToken);
      dispatch(login());
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
      setErrorMessage(myError.message);
    }

    setIsSending(false);
  };

  return (
    <Card title="Авторизоваться" variant="borderless" style={{ width: '100%', maxWidth: 400 }}>
      {errorMessage && (
        <Alert description={errorMessage} type="error" style={{ marginBottom: '24px' }} />
      )}

      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
        disabled={isSending}
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
