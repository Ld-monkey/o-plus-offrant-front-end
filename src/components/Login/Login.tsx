import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducer/user';
import './Login.scss';
import axios from '../../api/axios';

function Login({
  toggleModalLogin,
  isOpenModal,
}: {
  toggleModalLogin: () => void;
  isOpenModal: boolean;
}) {
  const [isRegistrerView, setIsRegisterView] = useState(false);

  const isOpenLogin = isOpenModal;

  const dispatch = useAppDispatch();
  const { logged: isLogged } = useAppSelector((state) => state.user);

  /**
   *
   * @param event
   */
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };

  /**
   *
   */
  const handleCreateAccount = () => {
    setIsRegisterView(!isRegistrerView);
  };

  /**
   *
   */
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const [firstname, lastname, email, pwd] = formData.values();

    try {
      const response = await axios.post('/api/register', {
        prenom: firstname,
        nom: lastname,
        adresse_mail: email,
        mot_de_passe: pwd,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Take the whole screen and give a shadow effect */}
      <div
        className={
          isOpenLogin && !isLogged
            ? 'entire-shadow-screen is-active'
            : 'entire-shadow-screen'
        }
        onClick={toggleModalLogin}
        role="button"
        aria-label="login"
        aria-hidden="true"
      />

      {/* Modal for login */}
      <div
        className={
          isOpenLogin && !isLogged ? 'modal-login is-active' : 'modal-login'
        }
      >
        <FontAwesomeIcon
          icon={faSquareXmark}
          className="close-login"
          onClick={toggleModalLogin}
        />
        {!isRegistrerView ? (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" name="email" />
            <input
              type="password"
              placeholder="Mot de Passe"
              id="password"
              name="password"
            />
            <button type="submit" className="login">
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} autoComplete="none">
            <input type="text" placeholder="Prénom" name="firstname" required />
            <input type="text" placeholder="Nom" name="lastname" required />
            <input type="email" placeholder="Email" name="email" required />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <label>
              <input
                type="checkbox"
                name="isAdult"
                className="checkbox-is-adult"
              />
              Je certifie être majeur.
            </label>
            <button type="submit" className="btn-registrer">
              Créer un compte
            </button>
          </form>
        )}
        {!isRegistrerView ? (
          <div>
            <p>Aucun compte ?</p>
            <button
              type="button"
              className="create-account"
              onClick={handleCreateAccount}
            >
              Créer un compte
            </button>
          </div>
        ) : (
          <div>
            <p>Déjà un compte ?</p>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="login"
            >
              Utiliser son compte
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
