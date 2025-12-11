import { Navigate, Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { MainLayout } from './components/MainLayout';
import ProfilePage from './pages/ProfilePage.tsx';
import { AuthLayout } from './components/AuthLayout';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { ConfigProvider } from 'antd';
import { NotificationProvider } from './providers/NotificationProvider.tsx';
import UsersPage from './pages/UsersPage.tsx';

function App() {

  return (
    <NotificationProvider>
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
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TodoListPage />} />
            <Route
              path="profile"
              element={
                <ProfilePage />
              }
            />
            <Route
              path="users"
              element={
                <UsersPage />
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
                <SigninPage />
              }
            />
            <Route
              path="signup"
              element={
                <SignupPage />
              }
            />
          </Route>
        </Routes>
      </ConfigProvider>
    </NotificationProvider>
  );
}

export default App;
