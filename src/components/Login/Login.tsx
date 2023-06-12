import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';

function Login({ toggleModalLogin, isOpenModal }) {
  const isOpenLogin = isOpenModal;

  return (
    <>
      {/* Take the whole screen and give a shadow effect */}
      <div
        className={
          isOpenLogin
            ? 'entire-shadow-screen is-active'
            : 'entire-shadow-screen'
        }
        onClick={toggleModalLogin}
        role="button"
        aria-label="login"
        aria-hidden="true"
      />

      {/* Modal for login */}
      <div className={isOpenLogin ? 'modal-login is-active' : 'modal-login'}>
        <FontAwesomeIcon
          icon={faSquareXmark}
          className="close-login"
          onClick={toggleModalLogin}
        />
        <form>
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Mot de Passe" id="password" />
          <button type="submit" className="login">
            Se connecter
          </button>
          <p>Aucun compte ?</p>
          <button type="button" className="create-account">
            Créer un compte
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
