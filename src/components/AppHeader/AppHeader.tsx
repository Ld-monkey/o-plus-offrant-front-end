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
import PopupBox from './PopupBox';
import axios from '../../api/axios';

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

function AppHeader({ toggleModalLogin }: { toggleModalLogin: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentSearchBar, setContentSearchBar] = useState('');
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticlesProps[]>([]);

  const {
    logged: isLogged,
    prenom: username,
    logo_profile: avatar,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isLogged) {
      setOpenPopup(false);
    }

    async function fetchArticles() {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data.allArticles);
      } catch {
        console.error('error');
      }
    }
    fetchArticles();
  }, [isLogged]);

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
            <div className="container-searchbar">
              <div className="searchbar">
                <form
                  className="inside-navbar"
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
              </div>
              <div className="resultSearch">
                <ul className="arraySearch">
                  {contentSearchBar &&
                    articles
                      .filter((element) =>
                        element.nom
                          .toLowerCase()
                          .includes(contentSearchBar.toLowerCase())
                      )
                      .map((article) => (
                        <li className="list-inside" key={article.id}>
                          <Link
                            onClick={() => setContentSearchBar('')}
                            to={`/article/${article.id}`}
                          >
                            {article.nom}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            <div className="header-navbar-container">
              <Link to="article/creation" className="header-link-sell">
                <FontAwesomeIcon icon={faSackDollar} className="icon-dollar" />
                Vendre
              </Link>
              <Link to="articles" className="header-link-category">
                <FontAwesomeIcon icon={faToolbox} className="icon-category" />
                Articles
              </Link>
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
                <div
                  className="loging-container"
                  onMouseEnter={() => setOpenPopup(true)}
                  onMouseLeave={() => setOpenPopup(false)}
                >
                  <button type="button" className="header-btn-online">
                    <div className="logo-user-profil">
                      <img src={avatar} alt="avatar" className="avatar" />
                    </div>
                    <span>Bonjour {splitUsername(username)}</span>
                  </button>
                  {openPopup && <PopupBox />}
                </div>
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
