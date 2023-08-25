import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Alerts from '../Alerts/Alerts';
import AppHeader from '../AppHeader/AppHeader';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.scss';
import Loader from '../Loader/Loader';

export interface IsetIsOpenModal {
  isOpenModal: boolean | undefined;
  setIsOpenModal: () => void;
}

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

  return (
    <div className="app">
      <AppHeader toggleModalLogin={checkOpenModal} />
      {alert && <Alerts message={message} type={alert} timeout={timeout} />}
      <main>
        <Outlet />
      </main>
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
      <Footer toggleModalLogin={checkOpenModal} />
    </div>
  );
}

export default App;
