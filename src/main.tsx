import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
import './global.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
