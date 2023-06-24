import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.scss';

export interface IsetIsOpenModal {
  isOpenModal: boolean | undefined;
  setIsOpenModal: () => void;
}

function App() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
      <Outlet />
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
      <Footer toggleModalLogin={checkOpenModal} />
    </div>
  );
}

export default App;
