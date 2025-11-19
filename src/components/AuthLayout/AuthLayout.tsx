import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

export const AuthLayout = () => {
  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5em',
          minHeight: '100vh',
          backgroundColor: '#001529',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
