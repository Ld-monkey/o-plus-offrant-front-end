import AddArticle from '../AddProduct/AddArticle';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Categories />
      <AddArticle />
    </div>
  );
}

export default App;
