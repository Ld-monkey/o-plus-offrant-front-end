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
            <a href='#' className="header-sell">Vendre</a>
          </div>
          <div className="wrapper-category">
            <FontAwesomeIcon icon={faToolbox} size="lg" style={{color: "#0c7eb4",}}/>
            <a href='#' className="header-category">Catégories</a>
          </div>
          <a href='#' className="header-login">
            <FontAwesomeIcon icon={faCircleUser} size="lg" style={{color: "#ffffff",}} className="icon-user" />
            Connectez-vous</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
