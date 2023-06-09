import Cards from '../Cards/Cards';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Categories />
      <Cards />
    </div>
  );
}

export default App;
