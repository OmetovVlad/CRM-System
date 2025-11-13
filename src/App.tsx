import { Navigate, Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { MainLayout } from './components/MainLayout';
import ProfilePage from './pages/ProfilePage.tsx';
import { ConfigProvider, notification } from 'antd';
import { AuthLayout } from './components/AuthLayout';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {
  const [api, contextHolder] = notification.useNotification();

  const notificationError = (message: string) => {
    api.error({
      message: message,
    });
  };

  const notificationInfo = (message: string) => {
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout
                  notificationError={notificationError}
                  notificationInfo={notificationInfo}
                />
              </ProtectedRoute>
            }
          >
            <Route index element={<TodoListPage notificationError={notificationError} />} />
            <Route
              path="profile"
              element={
                <ProfilePage
                  notificationError={notificationError}
                  notificationInfo={notificationInfo}
                />
              }
            />
          </Route>

          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            <Route index element={<Navigate to="signin" replace />} />
            <Route
              path="signin"
              element={
                <SigninPage
                  notificationError={notificationError}
                  notificationInfo={notificationInfo}
                />
              }
            />
            <Route
              path="signup"
              element={
                <SignupPage
                  notificationError={notificationError}
                  notificationInfo={notificationInfo}
                />
              }
            />
          </Route>
        </Routes>
        {contextHolder}
      </ConfigProvider>
    </>
  );
}

export default App;
