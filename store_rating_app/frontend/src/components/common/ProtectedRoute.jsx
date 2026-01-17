import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    const redirectPath = user.role === 'admin' ? '/admin' : 
                         user.role === 'owner' ? '/owner' : '/user';
    
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}