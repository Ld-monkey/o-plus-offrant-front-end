import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCartShopping,
  faSackDollar,
  faToolbox,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import './AppHeaderBis.scss';

function AppHeaderBis() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the item list when the hamburger menu is clicked.
   */
  function handleClickToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <header className="header">
        <div id="wrapper">
          <nav className="header-navbar">
            <h1 className="header-logo">O+ Offrant</h1>
            {/* inside navbar */}
            <form className="searchbar inside-navbar" role="search">
              <button type="button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input
                type="search"
                name="searchbar"
                placeholder="Que cherchez-vous ?"
                aria-label="Search article through site content"
              />
            </form>
            <div className="header-navbar-container">
              <button type="button" className="header-btn-sell">
                <FontAwesomeIcon icon={faSackDollar} className="icon-dollar" />
                <span>Vendre</span>
              </button>
              <button type="button" className="header-btn-category">
                <FontAwesomeIcon icon={faToolbox} className="icon-category" />
                <span>Categories</span>
              </button>
              <button type="button" className="header-btn-login">
                <FontAwesomeIcon icon={faCircleUser} className="icon-user" />
                <span>Connectez-vous</span>
              </button>
              {/* Hamburger menu */}
              <div className="hamburger-menu">
                <input
                  className="toggler-hamburger"
                  type="checkbox"
                  name="toggler-hamburger"
                  onClick={handleClickToggle}
                />
                <div
                  className={
                    isOpen ? 'hamburger-line is-active' : 'hamburger-line'
                  }
                >
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* outside navbar */}
      <div id="wrapper">
        <form className="searchbar outside-navbar" role="search">
          <button type="button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="search"
            name="searchbar"
            placeholder="Que cherchez-vous ?"
            aria-label="Search article through site content"
          />
        </form>
      </div>
      {isOpen && (
        <aside className="aside-menu">
          <ul className="menu-items">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#food">Category</a>
            </li>
            <li>
              <a href="#food-menu">Menu</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default AppHeaderBis;
