import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Categories from '../Categories/Categories';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.scss';
// import CarouselItem from '../Carousel/Carousel';
// import Cards from '../Cards/Cards';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
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
      <Categories />
      <Outlet />
      {/* <Cards />
      <CarouselItem /> */}
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
      <Footer />
    </div>
  );
}

export default App;
