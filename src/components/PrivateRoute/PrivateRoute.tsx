import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

function PrivateRoute({ children }) {
  const { logged: isLogged } = useAppSelector((state) => state.user);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
