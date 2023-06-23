import { useState, FormEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faMagnifyingGlass,
  faSackDollar,
  faToolbox,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import './AppHeader.scss';
import { useAppSelector } from '../../hooks/redux';
import axios from '../../api/axios';

function AppHeader({ toggleModalLogin }: { toggleModalLogin: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentSearchBar, setContentSearchBar] = useState('');

  const {
    logged: isLogged,
    prenom: username,
    logo_profile: avatar,
  } = useAppSelector((state) => state.user);

  /**
   * Split name when to long.
   * @param name {string} - User name (pseudo).
   * @returns Return the split or unsplit name.
   */
  function splitUsername(name: string | undefined): string {
    if (!name) {
      return '';
    }
    const characterLimit = 10;
    if (name.length > characterLimit) {
      return ''.concat(name.slice(0, characterLimit), '...');
    }
    return name;
  }

  /**
   * Toggle the item list when the hamburger menu is clicked.
   */
  function handleClickToggle() {
    setIsOpen(!isOpen);
  }

  interface ArticlesProps {
    id: number;
    nom: string;
    photo: string;
    prix_de_depart: string;
    date_de_fin: string;
    montant: string;
    categorie_id: number;
    categorie: string;
    categorie_nom: string;
  }
  const [articles, setArticles] = useState<ArticlesProps[]>([]);
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data.allArticles);
      } catch {
        console.log('error');
      }
    }
    fetchArticles();
  });
  /**
   * Updates searchbar content.
   */
  function changeInputContent(event: React.ChangeEvent<HTMLInputElement>) {
    setContentSearchBar(event?.target.value);
  }

  /**
   * Submit search.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <header className="header">
        <div id="wrapper">
          <nav className="header-navbar">
            <Link to="/">
              <h1 className="header-logo">O+ Offrant</h1>
            </Link>
            {/* inside navbar */}
            <div className="container-inside">
              <form
                className="searchbar inside-navbar"
                role="search"
                onSubmit={handleSubmit}
              >
                <button type="button">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                  type="search"
                  name="searchbar"
                  placeholder="Que cherchez-vous ?"
                  aria-label="Search article through site content"
                  onChange={changeInputContent}
                  value={contentSearchBar}
                />
              </form>
              <div className="resultSearch">
                {contentSearchBar &&
                  articles
                    .filter((element) =>
                      element.nom
                        .toLowerCase()
                        .includes(contentSearchBar.toLowerCase())
                    )
                    .map((article) => (
                      <ul className="arraySearch" key={article.id}>
                        <li className="list-inside">
                          <Link
                            onClick={() => setContentSearchBar(article.nom)}
                            to={`/produit/${article.id}`}
                          >
                            {article.nom}
                          </Link>
                        </li>
                      </ul>
                    ))}
              </div>
            </div>
            <div className="header-navbar-container">
              <button type="button" className="header-btn-sell">
                <FontAwesomeIcon icon={faSackDollar} className="icon-dollar" />
                <Link to="produit/creation">Vendre</Link>
              </button>
              <button type="button" className="header-btn-category">
                <FontAwesomeIcon icon={faToolbox} className="icon-category" />
                <Link to="produits">Toutes les ventes</Link>
              </button>
              {!isLogged ? (
                <button
                  type="button"
                  className="header-btn-login"
                  onClick={toggleModalLogin}
                >
                  <FontAwesomeIcon icon={faCircleUser} className="icon-user" />
                  <span>Connexion / Inscription</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="header-btn-online"
                  onClick={toggleModalLogin}
                >
                  <div className="logo-user-profil">
                    <img src={avatar} alt="avatar" className="avatar" />
                  </div>
                  <span>Bonjour {splitUsername(username)}</span>
                </button>
              )}
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

export default AppHeader;
