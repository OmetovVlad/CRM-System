import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, type MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { LogoutOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '../../api';
import { exit, fetchProfileData, setRoles } from '../../store/reducers/AuthSlice.ts';
import { tokenManager } from '../../utils/TokenManager.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { useNotification } from '../../providers/NotificationProvider.tsx';
import type { RootState } from '../../store';
import { useEffect } from 'react';
import { RolesValues } from '../../types';

export const MainLayout = () => {
  const {roles, isLoggedIn}  = useAppSelector((state: RootState) => state.auth);
  const {notificationSuccess, notificationError} = useNotification();
  type MenuItem = Required<MenuProps>['items'][number];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn && roles.length === 0) {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logout();

      notificationSuccess('Вы вышли из системы');

      tokenManager.clearToken();
      localStorage.removeItem('refreshToken');
      dispatch(exit());
      dispatch(setRoles([]));
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  };

  const items: MenuItem[] = [
    {
      key: '/',
      icon: <UnorderedListOutlined />,
      label: <Link to={'/'}>список задач</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to={'/profile'}>профиль</Link>,
    },

    ...(roles.includes(RolesValues.ADMIN) || roles.includes(RolesValues.MODERATOR) ? [
      {
        key: '/users',
        icon: <TeamOutlined />,
        label: <Link to={'/users'}>Пользователи</Link>,
      }
    ] : []),

    {
      danger: true,
      key: '/user/logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: handleLogout,
      style: { marginTop: 'auto' },
    },
  ];

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu
          theme={'dark'}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '1.5em', overflow: 'initial' }}>
          <div
            style={{
              padding: '1.5em',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
