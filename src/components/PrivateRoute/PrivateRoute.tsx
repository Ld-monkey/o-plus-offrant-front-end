import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

type Props = {
  children: JSX.Element;
};

function PrivateRoute({ children }: Props) {
  const { logged: isLogged } = useAppSelector((state) => state.user);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
