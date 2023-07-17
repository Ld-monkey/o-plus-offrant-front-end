import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAppSelector } from '../../hooks/redux';
import Alerts from '../Alerts/Alerts';
import AppHeader from '../AppHeader/AppHeader';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.scss';

export interface IsetIsOpenModal {
  isOpenModal: boolean | undefined;
  setIsOpenModal: () => void;
}

// Exemple for socket.io
const socket = io('http://localhost:4000');

function App() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const {
    message,
    type: alert,
    timeout,
  } = useAppSelector((state) => state.alert);
  const location = useLocation();

  const checkOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  // socket.io useEffet.
  useEffect(() => {
    console.log('coucou send message');
    socket.emit('send_message', { message: 'hello world' });
  });

  return (
    <div className="app">
      <AppHeader toggleModalLogin={checkOpenModal} />
      {alert && <Alerts message={message} type={alert} timeout={timeout} />}
      <Outlet />
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
      <Footer toggleModalLogin={checkOpenModal} />
    </div>
  );
}

export default App;
