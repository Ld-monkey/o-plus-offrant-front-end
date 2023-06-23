import { Link } from 'react-router-dom';
import './PopupBox.scss';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/reducer/user';

function PopupBox() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <div className="box-container">
      <div className="box-container-popup">
        <Link to="/profile">Profil</Link>
        <Link to="/">Accueil</Link>
        <Link to="#logout" onClick={() => handleLogout()}>
          Déconnection
        </Link>
      </div>
    </div>
  );
}
export default PopupBox;
