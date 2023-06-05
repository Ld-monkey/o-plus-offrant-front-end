import SearchIcon from '../UI/Icon/Search/Search';
import UserIcon from '../UI/Icon/User/User';

import './Header.scss';

// TODO: Icone Loupe a mettre en place, icone user a centrer verticalement, police a mettre en place

function Header() {
  return (
    <header className="header">
      <div id="wrapper">
        <nav className="header-navbar">
          <img src="/Logo.png" className="header-logo" alt="logo"/>
          <h1 className="header-title">+ OFFRANT</h1>
          <form className="header-form">
            {/* <SearchIcon icon="search" size={20} color="grey" /> */}
            <input type="text" className="header-searchbar" placeholder='Votre recherche' />
          </form>
          <button className="header-category">Catégorie</button>
          <button className="header-sell">Vendre</button>
          <button className="header-login">
            <UserIcon icon="user" size={20} color="white" className="icon-user"/>
            Connectez-vous</button>
        </nav>
      </div>
    </header>
  )
}

export default Header;
