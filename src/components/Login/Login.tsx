import './Login.scss';

function Login({ toggleModalLogin, isOpenModal }) {
  const isOpenLogin = isOpenModal;

  return (
    <div>
      <div
        className={
          isOpenLogin
            ? 'entire-shadow-screen is-active'
            : 'entire-shadow-screen'
        }
        onClick={toggleModalLogin}
        role="button"
      ></div>
      <div className={isOpenLogin ? 'modal-login is-active' : 'modal-login'}>
        <form>
          <input
            type="text"
            placeholder="Email ou Identifiant"
            id="identifiant"
          />
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
          />
          <button role="button" className="login">Se connecter</button>
          <p>Aucun compte ?</p>
          <button role="button" className="create-account">Créer un compte</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
