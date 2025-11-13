import { Alert, Button, Card, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { UserRegistration } from '../types';
import { signup } from '../api';
import { useState } from 'react';

interface Props {
  notificationError: (message: string) => void;
  notificationInfo: (message: string) => void;
}

const SignupPage = ({ notificationError, notificationInfo }: Props) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const normalizeLatin = (value: string) => {
    return value ? value.replace(/[^a-zA-Z]/g, '') : '';
  };
  const normalizeCyrLatin = (value: string) => {
    return value ? value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '') : '';
  };

  const normalizePhone = (value: string) => {
    if (!value) return '';
    return value.replace(/[^\d+]/g, '');
  };

  const onFinish = async (values: UserRegistration) => {
    const { username, login, email, phoneNumber, password } = values;

    setIsSending(true);

    try {
      await signup({ username, login, email, phoneNumber, password });
      notificationInfo('Аккаунт успешно создан');
      setErrorMessage('');
      setIsSuccess(true);
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
      setErrorMessage(myError.message);
    }

    setIsSending(false);
  };

  return (
    <Card title="Создать аккаунт" variant="borderless" style={{ width: '100%', maxWidth: 400 }}>
      {isSuccess && (
        <>
          Аккаунт создан успешно!
          <br />
          <Link to={'/auth/signin'}>Перейти на страницу авторизации для входа в систему</Link>
        </>
      )}

      {errorMessage && (
        <Alert description={errorMessage} type="error" style={{ marginBottom: '24px' }} />
      )}

      {!isSuccess && (
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
          disabled={isSending}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Введите имя пользователя' },
              { min: 1, max: 60, message: 'Длинна логина от 2 до 60 символов' },
            ]}
            normalize={normalizeCyrLatin}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
          </Form.Item>

          <Form.Item
            name="login"
            rules={[
              { required: true, message: 'Введите логин' },
              { min: 2, max: 60, message: 'Длинна логина от 2 до 60 символов' },
            ]}
            normalize={normalizeLatin}
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

          <Form.Item
            name="password2"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Введите пароль еще раз' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Повторите пароль" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Введите e-mail' },
              { type: 'email', message: 'Введите корректный e-mail' },
            ]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Введите номер телефона' },
              {
                pattern: /^(\+7)?[\d]{10}$/,
                message: 'Введите корректный номер телефона через +7',
              },
            ]}
            normalize={normalizePhone}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              return value.replace(/[^\d+]/g, '');
            }}
          >
            <Input prefix={<PhoneOutlined />} type="tel" placeholder="Телефон" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            или <Link to="/auth/signin">Войти</Link>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default SignupPage;
