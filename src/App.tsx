import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { Layout } from './components/Layout';
import ProfilePage from './pages/ProfilePage.tsx';
import { message } from 'antd';

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const errorAlert = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoListPage errorAlert={errorAlert} />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      {contextHolder}
    </>
  );
}

export default App;
