import { useEffect, useState } from 'react';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CategoriesProps from '../../@types/interfaces';
import './AddArticle.scss';
import axios from '../../api/axios';
import { useAppSelector } from '../../hooks/redux';

function AddArticle() {
  const privateAxios = useAxiosPrivate();
  const userId = useAppSelector((state) => state.user.id);

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [image, setImage] = useState<FileList | null>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputsData, setInputsData] = useState({
    titre: '',
    description: '',
    categorie: '',
    prix_de_depart: '0',
    temps_de_vente: '',
    photo: null,
  });

  /**
   * Retrieve categories from API to render in the menu of options
   */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  /**
   * Send form values to the API in FormData
   * @param event
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      throw Error('Custom erreur : Aucune image.');
    }

    const imageUpload = image[0];

    const formData = new FormData();
    formData.append('nom', inputsData.titre);
    formData.append('description', inputsData.description);
    formData.append('categorie_id', inputsData.categorie);
    formData.append('prix_de_depart', inputsData.prix_de_depart);
    formData.append('date_de_fin', inputsData.temps_de_vente);
    formData.append('photo', imageUpload);
    formData.append('date_et_heure', new Date().toJSON());
    formData.append('utilisateur_vente_id', userId);
    formData.append('montant', inputsData.prix_de_depart);

    try {
      const response = await privateAxios.post(
        '/article/creation/add',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (response.status === 200) {
        setSuccessMessage('Votre article a bien été enregistré');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setInputsData({
          titre: '',
          description: '',
          categorie: '',
          prix_de_depart: '0',
          temps_de_vente: '',
          photo: null,
        });
        setImage(null);
      }
    } catch (error) {
      setErrorMessage('Veuillez vous connecter / inscrire');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.error('Veuillez-vous connecter / inscrire', error);
    }
  };

  return (
    <div id="wrapper">
      <h2 className="sell-article">Vendre votre article</h2>
      <form method="post" className="add-article-form" onSubmit={handleSubmit}>
        <div className="article-name">
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            name="titre"
            id="titre"
            onChange={(e) =>
              setInputsData((prevState) => ({
                ...prevState,
                titre: e.target.value,
              }))
            }
            value={inputsData.titre.slice(0, 30)}
            placeholder="Mug O'Clock"
          />
        </div>

        <div className="article-description">
          <label htmlFor="description">Description :</label>
          <textarea
            rows={5}
            name="description"
            id="description"
            onChange={(e) =>
              setInputsData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setInputsData((prevState) => ({
                ...prevState,
                categorie: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setInputsData((prevState) => ({
                ...prevState,
                prix_de_depart: e.target.value,
              }))
            }
            value={inputsData.prix_de_depart}
            placeholder="100"
          />
        </div>

        <div className="article-timer">
          <label htmlFor="temps-de-vente">Temps de vente :</label>
          <input
            type="datetime-local"
            name="temps_de_vente"
            id="temps-de-vente"
            onChange={(e) =>
              setInputsData((prevState) => ({
                ...prevState,
                temps_de_vente: e.target.value,
              }))
            }
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
            onChange={(e) => setImage(e.target?.files)}
          />
        </div>

        <div className="form-submit-btn">
          <button type="submit" className="add-article-btn">
            Valider
          </button>
        </div>
      </form>
      {successMessage && <div className="success-msg">{successMessage}</div>}
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
    </div>
  );
}

export default AddArticle;
