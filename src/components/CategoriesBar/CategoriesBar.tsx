import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './CategoriesBar.scss';

interface Category {
  id: number;
  nom: string;
}

function CategoriesBar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          'https://didierlam-server.eddi.cloud/api/categories'
        );
        setCategories(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
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
            to="/produits"
            className="categories-link"
            state={{ nameCategory: `${category.nom}` }}
          >
            {category.nom}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default CategoriesBar;
