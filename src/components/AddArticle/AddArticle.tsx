import { useEffect, useState } from 'react';
import axios from 'axios';

import CategoriesProps from '../../@types/interfaces';
import './AddArticle.scss';

function AddArticle() {
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
      <h2>Vendre votre article</h2>
      <form method="post" className="add-article-form">
        <div className="article-name">
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            // name="titre"
            id="titre"
            placeholder="Mug O'Clock"
          />
        </div>

        <div className="article-description">
          <label htmlFor="description">Description :</label>
          <textarea
            rows={5}
            id="description"
            placeholder="Détail de l'article..."
          />
        </div>

        <div className="article-category">
          <label htmlFor="categorie">Catégorie :</label>
          <select id="categorie" defaultValue="default-value" required>
            <option className="default-option" value="default-value" disabled>
              -- Veuillez-sélectionner --
            </option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={`categorie-${categorie.nom}`}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="article-price">
          <label htmlFor="prix-de-depart">Prix de départ :</label>
          <input type="text" id="prix-de-depart" placeholder="100 Tokens" />
        </div>

        <div className="article-timer">
          <label htmlFor="temps-de-vente">Temps de vente :</label>
          <div className="wrapper" id="temps-de-vente">
            <label htmlFor="short-sale">
              <input
                type="radio"
                name="sale-period"
                id="short-sale"
                value="72 Hours"
                defaultChecked
              />
              Vente sur 3 Jours
            </label>
            <label htmlFor="long-sale">
              <input
                type="radio"
                id="long-sale"
                name="sale-period"
                value="168 Hours"
              />
              Vente sur 7 Jours
            </label>
          </div>
        </div>

        <div className="article-photo">
          <label htmlFor="photo">Photo :</label>
          <input type="file" accept="image/*" id="photo" />
        </div>

        <div className="form-submit-btn">
          <button type="submit" className="add-article-btn">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
