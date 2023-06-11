import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import SingleProduct from '../SingleProduct/SingleProduct';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Categories />
      <SingleProduct />
    </div>
  );
}

export default App;
