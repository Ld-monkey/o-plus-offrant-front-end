import { useState } from 'react';
import './AddArticle.scss';
import CategoriesProps from '../../@types/interfaces';

function AddArticle() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

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
            <option value="category-1">Catégorie 1</option>
            <option value="category-2">Catégorie 2</option>
            <option value="category-3">Catégorie 3</option>
            <option value="category-4">Catégorie 4</option>
            <option value="category-N">Catégorie N</option>
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
