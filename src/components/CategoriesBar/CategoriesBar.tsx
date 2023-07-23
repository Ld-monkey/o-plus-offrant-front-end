import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

import './CategoriesBar.scss';
import CategoriesProps from '../../@types/interfaces';

const API = import.meta.env.VITE_AXIOS_SERVER;

function CategoriesBar() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
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
            to="/articles"
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
