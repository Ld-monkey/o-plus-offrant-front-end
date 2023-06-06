import SearchIcon from '../UI/Icon/Search/SearchIcon';
import UserIcon from '../UI/Icon/User/UserIcon';

import './Header.scss';

// TODO: Icone Loupe a mettre en place, police a mettre en place

function Header() {
  return (
    <header className="header">
      <div id="wrapper">
        <nav className="header-navbar">
          <h1 className="header-title">O+ OFFRANT</h1>
          <form className="header-form">
            <div className="searchbar-container">
              {/* <SearchIcon icon="search" size={20} color="grey" /> */}
              <input type="text" className="header-searchbar" placeholder='Que cherchez-vous ?' />
            </div>
          </form>
          <button className="header-category">Catégorie</button>
          <button className="header-sell">Vendre</button>
          <button className="header-login">
            <UserIcon icon="user" size={20} color="white" className="icon-user"/>
            Connectez-vous</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
