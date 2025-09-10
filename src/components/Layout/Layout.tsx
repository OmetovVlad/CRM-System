import { Link, Outlet } from 'react-router-dom';
import { Layout as AntLayout, Menu, type MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '0',
    label: <Link to={'/'}>список задач</Link>,
  },
  {
    key: '1',
    label: <Link to={'/profile'}>профиль</Link>,
  },
];

export const Layout = () => {
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
    <AntLayout>
      <Sider style={siderStyle}>
        <Menu theme={'dark'} defaultSelectedKeys={['0']} mode="inline" items={items} />
      </Sider>
      <AntLayout>
        <Content style={{ margin: '1.5em 1em 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
