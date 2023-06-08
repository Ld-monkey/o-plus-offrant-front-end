import Category from '../Category/Category';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Category/>
      <Footer/>
    </div>
  );
}

export default App;
