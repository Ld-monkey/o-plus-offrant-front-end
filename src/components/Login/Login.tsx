import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducer/user';
import axios from '../../api/axios';
import './Login.scss';

function Login({
  toggleModalLogin,
  isOpenModal,
}: {
  toggleModalLogin: () => void;
  isOpenModal: boolean;
}) {
  const [isRegistrerView, setIsRegisterView] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');

  const [isLegalAge, setIsLegalAge] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');

  const isOpenLogin = isOpenModal;

  const { logged: isLogged } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  /**
   * By default, the login is displayed first (not registration).
   * Sensitives informations (email, password ...) are reset each time the view is changed.
   */
  useEffect(() => {
    const resetInputValues = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPwd('');

      setErrMsg('');
    };

    if (isOpenLogin) {
      resetInputValues();
    } else {
      setIsRegisterView(false);
    }
  }, [isOpenLogin, isRegistrerView]);

  /**
   *
   * @param event
   */
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        adresse_mail: email,
        mot_de_passe: pwd,
      });

      const token = response?.data.accessToken;
      const refresh = response?.data?.refreshToken;
      dispatch(login(token, refresh));
    } catch (error) {
      if (!error?.response) {
        setErrMsg('Aucune réponse du serveur');
      } else if (error.response?.status === 400) {
        setErrMsg("Manque le mot de passe ou de l'adresse mail");
      } else if (error.response?.status === 401) {
        setErrMsg(
          "La combinaison de l'adresse mail et du mot de passe est incorrecte."
        );
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  /**
   *
   */
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLegalAge) {
      setErrMsg('Vous devez avoir 18 ans ou plus.');
      return;
    }

    axios
      .post('/api/register', {
        prenom: firstname,
        nom: lastname,
        adresse_mail: email,
        mot_de_passe: pwd,
      })
      .then(() => {
        handleLogin(event);
      })
      .catch((error) => console.error(error));
  };

  /**
   *
   */
  const handleCreateAccount = () => {
    setIsRegisterView(!isRegistrerView);
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
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <input
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Mot de Passe"
              id="password"
              name="password"
              required
            />
            <p className="error-message">{errMsg}</p>
            <button type="submit" className="login">
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} autoComplete="off">
            <input
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Prénom"
              name="firstname"
              autoComplete="off"
              id="firstname"
              required
            />
            <input
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Nom"
              name="lastname"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <input
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              required
            />
            <label>
              <input
                type="checkbox"
                name="isAdult"
                className="checkbox-is-adult"
                checked={isLegalAge}
                onChange={() => setIsLegalAge(!isLegalAge)}
              />
              Je certifie être majeur.
            </label>
            <p className="error-message">{errMsg}</p>
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
