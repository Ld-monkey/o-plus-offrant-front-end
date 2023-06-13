import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__info">
        <h2>O + Offrant</h2>
        <Link to="#incscription">Inscription</Link>
        <Link to="#login">Connectez-vous</Link>
        <Link to="/produit/creation">Vendre</Link>
        <Link to="/produits">Catégories</Link>
      </div>
      <div className="Footer__Pseudo">
        <h2>Contactez-nous</h2>
        <a href="#pseudo1">Pseudo 1</a>
        <a href="#pseudo2">Pseudo 2</a>
        <a href="#pseudo3">Pseudo 3</a>
        <a href="#pseudo4">Pseudo 4</a>
        <a href="#pseudo5">Pseudo 5</a>
      </div>
    </footer>
  );
}

export default Footer;
