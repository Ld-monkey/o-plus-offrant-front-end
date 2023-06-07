import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faToolbox,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the navbar when the hamburger menu is clicked.
   */
  function handleClickToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="header">
      <div id="wrapper">
        <nav className="header-navbar">
          <h1 className="header-title">O+ Offrant</h1>
          <div className="header-container-elements">
            <form className="header-form">
              <div className="searchbar-container">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="sm"
                  style={{ color: "#000000" }}
                />
                <input
                  type="text"
                  name="search"
                  className="header-searchbar"
                  placeholder="Que cherchez-vous ?"
                />
              </div>
            </form>
            <div className="wrapper-cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                style={{ color: "#0c7eb4" }}
              />
              <button type="button" className="header-btn-sell">
                Vendre
              </button>
            </div>
<<<<<<< HEAD
            <div className="wrapper-category">
              <FontAwesomeIcon
                icon={faToolbox}
                size="lg"
                style={{ color: "#0c7eb4" }}
              />
              <button type="button" className="header-btn-category">
                Catégories
              </button>
            </div>
            <button type="button" className="header-btn-login">
              <FontAwesomeIcon
                icon={faCircleUser}
                size="lg"
                style={{ color: "#ffffff" }}
                className="icon-user"
              />
              Connectez-vous
            </button>
            <button
              type="button"
              className="toggler-hamburger"
              onClick={handleClickToggle}
            >
              x
            </button>
          </div>
=======
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
>>>>>>> develop
        </nav>
      </div>
    </header>
  );
}

export default Header;
