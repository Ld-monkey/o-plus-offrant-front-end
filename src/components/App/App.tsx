import { useState } from 'react';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import './App.scss';
import Login from '../Login/Login';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const checkOpenModal = () => {
    setIsOpenModal(!isOpenModal);
    console.log('IsOpenModal :', isOpenModal);
  };

  return (
    <div className="app">
      <Header toggleModalLogin={checkOpenModal} />
      <Categories />
      <Login toggleModalLogin={checkOpenModal} isOpenModal={isOpenModal} />
    </div>
  );
}

export default App;
