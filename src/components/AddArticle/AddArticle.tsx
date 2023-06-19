import { FormEvent, useEffect, useState } from 'react';
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

  // const [image, setImage] = useState('');

  // function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
  //   setImage(event.target.files[0]);
  // }

  const [data, setData] = useState({
    titre: '',
    description: '',
    categorie: 'default-value',
    prix_de_depart: 0,
    temps_de_vente: '',
    photo: '',
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
    console.log(newData);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://didierlam-server.eddi.cloud/api/article/creation/add',
        {
          nom: data.titre,
          photo: data.photo,
          description: data.description,
          prix_de_depart: data.prix_de_depart,
          date_de_fin: data.temps_de_vente,
          date_et_heure: '2023-06-19',
          utilisateur_vente_id: 3,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="wrapper">
      <h2>Vendre votre article</h2>
      <form method="post" className="add-article-form" onSubmit={handleSubmit}>
        <div className="article-name">
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            name="titre"
            id="titre"
            onChange={handleChange}
            value={data.titre}
            placeholder="Mug O'Clock"
          />
        </div>

        <div className="article-description">
          <label htmlFor="description">Description :</label>
          <textarea
            rows={5}
            name="description"
            id="description"
            onChange={handleChange}
            value={data.description}
            placeholder="Détail de l'article..."
          />
        </div>

        <div className="article-category">
          <label htmlFor="categorie">Catégorie :</label>
          <select
            id="categorie"
            defaultValue="default-value"
            name="categorie"
            onChange={handleChange}
            required
          >
            <option className="default-option" value="default-value" disabled>
              -- Veuillez-sélectionner --
            </option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.nom}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="article-price">
          <label htmlFor="prix-de-depart">Prix de départ (€):</label>
          <input
            type="number"
            name="prix_de_depart"
            id="prix-de-depart"
            onChange={handleChange}
            value={data.prix_de_depart}
            placeholder="100"
          />
        </div>

        <div className="article-timer">
          <label htmlFor="temps-de-vente">Temps de vente :</label>
          <input
            type="date"
            name="temps_de_vente"
            id="temps-de-vente"
            onChange={handleChange}
            value={data.temps_de_vente}
          />
        </div>

        <div className="article-photo">
          <label htmlFor="photo">Photo :</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            // onChange={handleImage}
          />
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
