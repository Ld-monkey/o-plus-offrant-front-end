import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Categories from '../Categories/Categories';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.scss';
// import CarouselItem from '../Carousel/Carousel';
// import Cards from '../Cards/Cards';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const checkOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

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
