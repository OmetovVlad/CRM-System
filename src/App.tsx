import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { MainLayout } from './components/MainLayout';
import ProfilePage from './pages/ProfilePage.tsx';
import { ConfigProvider, notification } from 'antd';

function App() {
  const [api, contextHolder] = notification.useNotification();

  const notificationError = (message: string) => {
    api.info({
      message: message,
    });
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TodoListPage notificationError={notificationError} />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        {contextHolder}
      </ConfigProvider>
    </>
  );
}

export default App;
