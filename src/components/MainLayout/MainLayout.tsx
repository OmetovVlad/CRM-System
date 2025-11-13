import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, type MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { LogoutOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '../../api';
import { exit } from '../../store/reducers/AuthSlice.ts';
import { tokenManager } from '../../utils/TokenManager.ts';
import { useAppDispatch } from '../../hooks/redux.ts';

interface Props {
  notificationError: (message: string) => void;
  notificationInfo: (message: string) => void;
}

export const MainLayout = ({ notificationError, notificationInfo }: Props) => {
  type MenuItem = Required<MenuProps>['items'][number];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout();

      notificationInfo('Вы вышли из системы');

      tokenManager.clearToken();
      localStorage.removeItem('refreshToken');
      dispatch(exit());
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
