import { useState } from 'react';
import Cards from '../Cards/Cards';
import AppHeader from '../AppHeader/AppHeader';
import Categories from '../Categories/Categories';
import Login from '../Login/Login';
import './App.scss';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const checkOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="app">
      <AppHeader toggleModalLogin={checkOpenModal} />
      <Categories />
      <Cards />
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
    </div>
  );
}

export default App;
