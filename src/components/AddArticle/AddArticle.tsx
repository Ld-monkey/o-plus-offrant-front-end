import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import './AddArticle.scss';

interface CategoriesProps {
  id: number;
  nom: string;
}

function AddArticle() {
  const privateAxios = useAxiosPrivate();

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

  // const [inputsData, setInputsData] = useState({
  //   titre: '',
  //   description: '',
  //   categorie: '',
  //   prix_de_depart: '0',
  //   temps_de_vente: '',
  //   photo: null,
  // });

  // function handleChange(
  //   event: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) {
  //   const newData = { ...inputsData };
  //   newData[event.target.name] = event.target.value;
  //   setInputsData(newData);
  //   console.log(newData);
  // }

  // const [image, setImage] = useState(null);

  // function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   console.log(event.target.files);
  //   setImage(event.target.files[0]);
  // }

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   try {
  //     const response = await privateAxios.post(
  //       'https://didierlam-server.eddi.cloud/article/creation/add',
  //       {
  //         nom: inputsData.titre,
  //         description: inputsData.description,
  //         categorie_id: inputsData.categorie,
  //         prix_de_depart: inputsData.prix_de_depart,
  //         date_de_fin: inputsData.temps_de_vente,
  //         photo: inputsData.photo,
  //         date_et_heure: new Date().toJSON().slice(0, 10),
  //         utilisateur_vente_id: 3,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Veuillez-vous connecter / inscrire', error);
  //   }
  // }

  const [image, setImage] = useState<string | Blob>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('photo', image);
    try {
      const result = await privateAxios.post(
        'https://didierlam-server.eddi.cloud/api/images',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(result);
    } catch (error) {
      console.error('Veuillez-vous connecter / inscrire', error);
    }
  };

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
            // onChange={(e) => setTitre(e.target.value)}
            // value={inputsData.titre}
            placeholder="Mug O'Clock"
          />
        </div>

        <div className="article-description">
          <label htmlFor="description">Description :</label>
          <textarea
            rows={5}
            name="description"
            id="description"
            // onChange={(e) => setDescription(e.target.value)}
            // value={inputsData.description}
            placeholder="Détail de l'article..."
          />
        </div>

        <div className="article-category">
          <label htmlFor="categorie">Catégorie :</label>
          <select
            id="categorie"
            defaultValue="default-value"
            name="categorie"
            // onChange={(e) => setCategorieId(e.target.value)}
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
            // onChange={(e) => setPrixDeDepart(e.target.value)}
            // value={inputsData.prix_de_depart}
            placeholder="100"
          />
        </div>

        <div className="article-timer">
          <label htmlFor="temps-de-vente">Temps de vente :</label>
          <input
            type="date"
            name="temps_de_vente"
            id="temps-de-vente"
            // onChange={(e) => setTempsDeVente(e.target.value)}
            // value={inputsData.temps_de_vente}
          />
        </div>

        <div className="article-photo">
          <label htmlFor="photo">Photo :</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={(e) => setImage(e.target.files[0])}
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
