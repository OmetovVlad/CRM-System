import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage.tsx';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
