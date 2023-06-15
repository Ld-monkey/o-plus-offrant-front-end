import { useEffect, useState } from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ICategory from './ICategory';

/**
 * Quand cliqué il faut faire apparaitre une pop-up être vous sûr de surenchérir à "Montant+5%"
 * modale/pop up : Confirmez vous votre enchère à Montant+5% ? OUI / ANNULER
 */
function handlePriceMore() {}

function Category() {
  const [articles, setArticles] = useState<ICategory[]>([]);

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get(
          `https://didierlam-server.eddi.cloud/api/articles`
        );
        setArticles(response.data.allArticles);
      } catch (error) {
        console.log(error);
      }
    }
    getArticles();
  }, []);

  const [checkedValues, setCheckedValues] = useState([]);

  function handleChangeCategory(event) {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedValues(value);
    }
  }
  console.log(checkedValues);

  return (
    <>
      <div id="wrapper">
        <form className="Sort_Choice">
          <p className="Category_Choice">
            <span>Catégories :</span>
            <label htmlFor="">
              <input
                type="checkbox"
                value="Sport_&_Loisirs"
                onChange={handleChangeCategory}
              />
              <span>Sport & Loisirs</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                value="Maison_&_Jardin"
                onChange={handleChangeCategory}
              />
              <span>Maison & Jardin</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                value="High_Tech"
                onChange={handleChangeCategory}
              />
              <span>High Tech</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                value="Mode"
                onChange={handleChangeCategory}
              />
              <span>Mode</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                value="Livres"
                onChange={handleChangeCategory}
              />
              <span>Livres</span>
            </label>
          </p>
          <p className="Tri">
            <div>
              <span>Trier par prix :</span>
              <label htmlFor="Croissant" className="categoryName">
                <input type="radio" value="increase" name="TriPrice" />
                <span>Croissant</span>
              </label>
              <label htmlFor="Décroissant" className="categoryName">
                <input type="radio" value="decrease" name="TriPrice" />
                <span>Décroissant</span>
              </label>
            </div>
            <div>
              <span>Trier par la durée :</span>
              <label htmlFor="La plus courte" className="categoryName">
                <input type="radio" name="TriTimer" checked />
                <span>La plus courte</span>
              </label>
              <label htmlFor="La plus longue" className="categoryName">
                <input type="radio" name="TriTimer" />
                <span>La plus longue</span>
              </label>
            </div>
          </p>
        </form>
      </div>
      <div className="containerCardCat">
        {articles.map((article) => (
          <Link key={article.id} to="/produit/1" className="cardCat">
            <h4 className="pictureName">{article.name}</h4>
            <img
              className="pictureItem"
              src="https://didierlam-server.eddi.cloud/images/chaise.jpg"
              alt={article.name}
            />
            <p className="priceItem">
              Prix initial : {article.prix_de_depart} €
            </p>

            <div className="liveAuction">
              <p className="timerAuction">
                Temps restant : {article.date_de_fin}
              </p>
              <p className="liveAuction__proceNow">
                Prix enchère actuelle : {article.montant} €
                <button
                  type="button"
                  className="liveAuction-button"
                  onClick={handlePriceMore}
                >
                  Surenchérir !
                </button>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div id="wrapper">
        <div className="button_container">
          <button type="button" className="buttonPage">
            Page précédente
          </button>
          <button type="button" className="buttonPage">
            Page suivante
          </button>
        </div>
      </div>
    </>
  );
}

export default Category;
