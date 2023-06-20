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

  const [inputsData, setInputsData] = useState({
    titre: '',
    description: '',
    categorie: '',
    prix_de_depart: '0',
    temps_de_vente: '',
    photo: null,
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const newData = { ...inputsData };
    newData[event.target.name] = event.target.value;
    setInputsData(newData);
    console.log(newData);
  }

  // const handleChange = (
  //   event: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = event.target;
  //   setInputsData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const [image, setImage] = useState(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    setImage(event.target.files[0]);
  }

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   setInputsData((prevData) => ({
  //     ...prevData,
  //     photo: file,
  //   }));
  // };

  //   if (image) {
  //     const reader = new FileReader();
  //     reader.onload = (evt) => {
  //       if (evt.target && evt.target.result) {
  //         const fileContent = evt.target.result as string;
  //         setImage(fileContent);
  //       }
  //     };
  //   }

  // if (imageFile) {
  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     const fileContent = evt.target?.result as string;
  //     console.log(fileContent);
  //   };
  //   reader.readAsText(imageFile);
  // }
  // }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://didierlam-server.eddi.cloud/article/creation/add',
        {
          nom: inputsData.titre,
          description: inputsData.description,
          categorie_id: inputsData.categorie,
          prix_de_depart: inputsData.prix_de_depart,
          date_de_fin: inputsData.temps_de_vente,
          photo: inputsData.photo,
          date_et_heure: new Date().toJSON().slice(0, 10),
          utilisateur_vente_id: 3,
        }
      );
      console.log(response);
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
            value={inputsData.titre}
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
            value={inputsData.description}
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
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="article-price">
          <label htmlFor="prix-de-depart">Prix de départ (€):</label>
          <input
            type="number"
            min="1"
            name="prix_de_depart"
            id="prix-de-depart"
            onChange={handleChange}
            value={inputsData.prix_de_depart}
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
            value={inputsData.temps_de_vente}
          />
        </div>

        <div className="article-photo">
          <label htmlFor="photo">Photo :</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={handleImageChange}
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
