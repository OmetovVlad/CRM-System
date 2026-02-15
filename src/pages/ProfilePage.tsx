import Title from 'antd/es/typography/Title';
import { profile, profileById, updateProfile } from '../api';
import { useCallback, useEffect, useState } from 'react';
import  { type ProfileRequest, RolesValues } from '../types';
import { Button, Col, Descriptions, Flex, Form, Input, Row, Spin } from 'antd';
import { useNotification } from '../providers/NotificationProvider.tsx';
import { useParams } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../hooks/redux.ts';
import type { RootState } from '../store';

const normalizePhone = (value: string) => {
  if (!value) return '';
  return value.replace(/[^\d+]/g, '');
};

const normalizeCyrLatin = (value: string) => {
  return value ? value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '') : '';
};

const ProfilePage = () => {
  const { notificationError } = useNotification();

  const { id } = useParams();
  const { roles } = useAppSelector((state: RootState) => state.auth);

  const isAdmin = roles.includes(RolesValues.ADMIN);
  const [userId, setUserId] = useState<number | string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileRequest>({
    username: '',
    email: '',
    phoneNumber: '',
  });

  const [profileForm] = Form.useForm<ProfileRequest>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const {
        profileId = id,
        username,
        email,
        phoneNumber,
      } = id ? await profileById(id) : await profile();

      setProfileData({ username, email, phoneNumber });
      setUserId(profileId);
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    } finally {
      setIsLoading(false);
    }
  }, [id, notificationError]);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchData();
      } catch (error) {
        const myError = error as Error;
        notificationError(myError.message);
      }
    };

    void load();
  }, [fetchData]);

  useEffect(() => {
    if (profileData) {
      profileForm.setFieldsValue({
        username: profileData.username,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
      });
    }
  }, [profileData, profileForm]);

  const handleUpdateProfile = async (values: ProfileRequest) => {
    if (!userId) return

    const changedFields: Partial<ProfileRequest> = {};

    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof ProfileRequest;

      if (values[typedKey] !== profileData[typedKey]) {
        changedFields[typedKey] = values[typedKey];
      }
    });

    try {

      if (!Object.keys(changedFields).length) return;

      await updateProfile(userId, changedFields);
      await fetchData();
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    } finally {
      setIsEditForm(false);
    }
  };

  return (
    <>
      <Row align="middle" justify="center">
        <Col span={16}>
          <Row align="middle" justify="start" style={{ marginBottom: '2em' }}>
            {id && (
              <Button
                href={'/users'}
                color="default"
                variant="filled"
                icon={<ArrowLeftOutlined />}
                style={{ margin: '0 24px 0 0' }}
              >
                Назад
              </Button>
            )}

            <Title level={3} style={{ margin: '0' }}>
              {id ? 'Профиль пользователя' : 'Личный кабинет'}
            </Title>

            {id && isAdmin && (
              <Button
                color="default"
                variant="solid"
                icon={<EditOutlined />}
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  setIsEditForm(true);
                }}
              >
                Редактировать
              </Button>
            )}
          </Row>

          {isLoading && (
            <Flex align={'center'} justify={'center'} style={{ margin: '2em 0' }}>
              <Spin size="large" />
            </Flex>
          )}

          {!isLoading && (
            <Form
              form={profileForm}
              layout="vertical"
              autoComplete="off"
              onFinish={handleUpdateProfile}
            >
              <Descriptions bordered layout="horizontal" column={1}>
                <Descriptions.Item label="Имя пользователя">
                  {isEditForm ? (
                    <Form.Item
                      name="username"
                      rules={[
                        { required: true, message: 'Введите имя пользователя' },
                        { min: 1, max: 60, message: 'Длинна логина от 2 до 60 символов' },
                      ]}
                      normalize={normalizeCyrLatin}
                      style={{ margin: 0 }}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
                    </Form.Item>
                  ) : (
                    profileData.username || 'Не указано'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {isEditForm ? (
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Введите e-mail' },
                        { type: 'email', message: 'Введите корректный e-mail' },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <Input prefix={<MailOutlined />} type="email" placeholder="E-mail" />
                    </Form.Item>
                  ) : (
                    profileData.email || 'Не указано'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                  {isEditForm ? (
                    <Form.Item
                      name="phoneNumber"
                      rules={[
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
                      style={{ margin: 0 }}
                    >
                      <Input prefix={<PhoneOutlined />} type="tel" placeholder="Телефон" />
                    </Form.Item>
                  ) : (
                    profileData.phoneNumber || 'Не указано'
                  )}
                </Descriptions.Item>
              </Descriptions>

              {isEditForm && (
                <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
                  <Row gutter={24} style={{ maxWidth: '500px', marginLeft: 'auto' }}>
                    <Col span={10}>
                      <Button
                        type="default"
                        shape="round"
                        onClick={() => {
                          setIsEditForm(false);
                        }}
                        size="large"
                        block
                      >
                        Отмена
                      </Button>
                    </Col>
                    <Col span={14}>
                      <Button type="primary" shape="round" htmlType="submit" size="large" block>
                        Сохранить
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
