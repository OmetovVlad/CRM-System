import Title from 'antd/es/typography/Title';
import { profile } from '../api';
import { memo, useCallback, useEffect, useState } from 'react';
import type { ProfileRequest } from '../types';
import { Descriptions, Flex, Spin } from 'antd';
import { useNotification } from '../providers/NotificationProvider.tsx';

const ProfilePage = memo(() => {
  const {notificationError} = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileRequest>({
    username: '',
    email: '',
    phoneNumber: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const { username, email, phoneNumber } = await profile();

      setProfileData({ username, email, phoneNumber });
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      try {
        await fetchData();
      } catch (error) {
        const myError = error as Error;
        notificationError(myError.message);
      }

      setIsLoading(false);
    };

    void load();
  }, [fetchData]);

  return (
    <>
      <Title level={2} style={{ marginTop: 0 }}>
        Личный кабинет
      </Title>

      {isLoading && (
        <Flex align={'center'} justify={'center'} style={{ margin: '2em 0' }}>
          <Spin size="large" />
        </Flex>
      )}

      {!isLoading && (
        <>
          <Descriptions title="Ваши данные" bordered layout="horizontal" column={1}>
            <Descriptions.Item label="Имя пользователя">
              {profileData.username || 'Не указано'}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{profileData.email || 'Не указано'}</Descriptions.Item>
            <Descriptions.Item label="Телефон">
              {profileData.phoneNumber || 'Не указано'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  );
});

export default ProfilePage;
