import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.ts';
import type { RootState } from '../../store';

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
