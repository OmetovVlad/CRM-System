import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, type MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: <Link to={'/'}>список задач</Link>,
  },
  {
    key: '/profile',
    label: <Link to={'/profile'}>профиль</Link>,
  },
];

export const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
