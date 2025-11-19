import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.ts';
import type { RootState } from '../../store';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};
