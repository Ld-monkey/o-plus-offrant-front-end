import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, registrer } from '../../store/reducer/user';
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
  const [pwdConfirmation, setPwdConfirmation] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [street, setStreet] = useState<string>('');

  const [isLegalAge, setIsLegalAge] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');

  const isOpenLogin = isOpenModal;

  const { logged: isLogged } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  /**
   * By default, the login is displayed first (not registration).
   * Sensitives informations (email, password ...) are reset each
   * time the view is changed.
   */
  useEffect(() => {
    const resetInputValues = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPwd('');
      setPwdConfirmation('');
      setStreet('');

      setErrMsg('');
    };

    if (isOpenLogin) {
      resetInputValues();
    } else {
      setIsRegisterView(false);
    }
  }, [isOpenLogin, isRegistrerView]);

  /**
   * Handle errors returned by an axios request and change the error message.
   * @param err - error
   */
  const httpErrorHandler = (err: number) => {
    if (!err) {
      setErrMsg('Aucune réponse du serveur');
    } else if (err === 400) {
      setErrMsg("Manque le mot de passe ou de l'adresse mail");
    } else if (err === 401) {
      setErrMsg(
        "La combinaison de l'adresse mail et du mot de passe est incorrecte."
      );
    } else {
      setErrMsg('Impossible de se logguer');
    }
  };

  /**
   * Login a user with email and password when submitting a form.
   * @param event - A form event.
   */
  const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(login({ email, pwd }))
      .then(unwrapResult)
      .then(() => {
        toggleModalLogin();
      })
      .catch(httpErrorHandler);
  };

  /**
   * Registers a user when submitting a form.
   * @param event - A form event.
   */
  const handleSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pwd !== pwdConfirmation) {
      setErrMsg('Les mots de passe ne correspondent pas');
      setPwd('');
      setPwdConfirmation('');
      return;
    }

    if (!isLegalAge) {
      setErrMsg('Vous devez avoir 18 ans ou plus.');
      return;
    }

    dispatch(registrer({ firstname, lastname, street, email, pwd }))
      .then(unwrapResult)
      .then((response) => {
        if (response === 200) {
          // Close registrer.
          toggleModalLogin();

          // Display a cool message to inform the user
          // that the account has been created.
        }
      })
      .catch(httpErrorHandler);
  };

  /**
   * Change the view from user login to user creation.
   */
  const ChangeRegistrationView = () => {
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
          <form onSubmit={handleSubmitLogin}>
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
          <form onSubmit={handleSubmitRegister} autoComplete="off">
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
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              placeholder="Adresse principale"
              name="adresse"
              required
            />
            <input
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Mot de passe"
              name="password"
              autoComplete="new-password"
              required
            />
            <input
              value={pwdConfirmation}
              onChange={(e) => setPwdConfirmation(e.target.value)}
              type="password"
              placeholder="Confirmation du mot de passe"
              name="Confirmation password"
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
              onClick={ChangeRegistrationView}
            >
              Créer un compte
            </button>
          </div>
        ) : (
          <div>
            <p>Déjà un compte ?</p>
            <button
              type="button"
              onClick={ChangeRegistrationView}
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
