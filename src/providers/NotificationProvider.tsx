import { notification } from 'antd';
import { createContext, type ReactNode, useContext } from 'react';

type NotificationContextType = {
  notificationSuccess: (message: string) => void;
  notificationError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({children}: {children: ReactNode}) => {
  const [api, contextHolder] = notification.useNotification();

  const notificationSuccess = (message: string) => {
    api.success({message: message});
  }
  const notificationError = (message: string) => {
    api.error({message: message});
  }

  return (
    <NotificationContext.Provider value={{notificationSuccess, notificationError}}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
}