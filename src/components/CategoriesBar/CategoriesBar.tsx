import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './CategoriesBar.scss';
import CategoriesProps from '../../@types/interfaces';

function CategoriesBar() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          'https://didierlam-server.eddi.cloud/api/categories'
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div id="wrapper">
      <nav className="categories-navbar">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.id}/produits`}
            className="categories-link"
          >
            {category.nom}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default CategoriesBar;
