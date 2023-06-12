import Cards from '../Cards/Cards';
import AppHeader from '../AppHeader/AppHeader';
import Categories from '../Categories/Categories';
import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <Categories />
      <Cards />
    </div>
  );
}

export default App;
