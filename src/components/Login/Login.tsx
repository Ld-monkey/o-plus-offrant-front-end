import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import axios from '../../api/axios';
import './Login.scss';

function Login({
  toggleModalLogin,
  isOpenModal,
}: {
  toggleModalLogin: () => void;
  isOpenModal: boolean;
}) {
  const isOpenLogin = isOpenModal;

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const [email, password] = formData.values();

    try {
      const response = await axios.post('/api/login', {
        adresse_mail: email,
        mot_de_passe: password,
      });
      console.log(response.data);
    } catch (e) {
      console.error('Fail to login :', e);
    }
  };

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
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" id="email" name="email" />
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
        <div>
          <p>Aucun compte ?</p>
          <button type="button" className="create-account">
            Créer un compte
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
