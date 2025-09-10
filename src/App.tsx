import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { Layout } from './components/Layout';
import ProfilePage from './pages/ProfilePage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
