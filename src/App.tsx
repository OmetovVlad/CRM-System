import { Navigate, Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { MainLayout } from './components/MainLayout';
import ProfilePage from './pages/ProfilePage.tsx';
import { ConfigProvider, notification } from 'antd';
import { AuthLayout } from './components/AuthLayout';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';

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
              // itemMarginBottom: 0,
            },
          },
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TodoListPage notificationError={notificationError} />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
        {contextHolder}
      </ConfigProvider>
    </>
  );
}

export default App;
