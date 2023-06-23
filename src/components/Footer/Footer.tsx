import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer({ toggleModalLogin }: { toggleModalLogin: () => void }) {
  return (
    <footer className="Footer">
      <div className="Footer__info">
        <h2>O + Offrant</h2>
        <Link to="#incscription" onClick={() => toggleModalLogin()}>
          Inscription
        </Link>
        <Link to="#login" onClick={() => toggleModalLogin()}>
          Connectez-vous
        </Link>
        <Link to="/produit/creation">Vendre</Link>
        <Link to="/produits">Catégories</Link>
      </div>
      <div className="Footer__Pseudo">
        <h2>Contactez-nous</h2>
        <a
          href="https://github.com/Christophe-miranville"
          rel="noreferrer"
          target="_blank"
        >
          Christophe Miranville
        </a>
        <a
          href="https://github.com/Estelle-Li-Zheng"
          rel="noreferrer"
          target="_blank"
        >
          Estelle Li Zheng
        </a>
        <a href="https://github.com/Ld-monkey" rel="noreferrer" target="_blank">
          Ld-monkey
        </a>
        <a href="https://github.com/DidierLam" rel="noreferrer" target="_blank">
          Didier Lam
        </a>
        <a
          href="https://github.com/stephanebidard"
          rel="noreferrer"
          target="_blank"
        >
          Stephane Bidard
        </a>
      </div>
    </footer>
  );
}

export default Footer;
