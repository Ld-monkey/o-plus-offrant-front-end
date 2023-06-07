import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faToolbox, faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <div id="wrapper">
        <nav className="header-navbar">
          <h1 className="header-title">O+ Offrant</h1>
          <form className="header-form">
            <div className="searchbar-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" style={{color: "#000000",}}/>
              <input type="text" name= "search" className="header-searchbar" placeholder='Que cherchez-vous ?' />
            </div>
          </form>
          <div className="wrapper-cart">
            <FontAwesomeIcon icon={faCartShopping} size="lg" style={{color: "#0c7eb4",}}/>
            <button type='button' className="header-sell">Vendre</button>
          </div>
          <div className="wrapper-category">
            <FontAwesomeIcon icon={faToolbox} size="lg" style={{color: "#0c7eb4",}}/>
            <button type='button' className="header-category">Catégories</button>
          </div>
          <button type='button' className="header-login">
            <FontAwesomeIcon icon={faCircleUser} size="lg" style={{color: "#ffffff",}} className="icon-user" />
            Connectez-vous</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
