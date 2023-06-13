import { NavLink } from 'react-router-dom';
import './Categories.scss';

function Categories() {
  return (
    <div id="wrapper">
      <nav className="categories-navbar">
        <NavLink
          to="/category/sport-et-loisir/produits"
          className="categories-link"
        >
          Sport & Loisirs
        </NavLink>
        <NavLink
          to="/category/maison-et-jardin/produits"
          className="categories-link"
        >
          Maison & Jardin
        </NavLink>
        <NavLink to="/category/high-tech/produits" className="categories-link">
          High Tech
        </NavLink>
        <NavLink to="/category/mode/produits" className="categories-link">
          Mode
        </NavLink>
        <NavLink to="/category/livres/produits" className="categories-link">
          Livres
        </NavLink>
      </nav>
    </div>
  );
}

export default Categories;
