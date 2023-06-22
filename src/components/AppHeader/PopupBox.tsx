import { Link } from 'react-router-dom';
import './PopupBox.scss';

function PopupBox() {
  function handleLogout() {}
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
