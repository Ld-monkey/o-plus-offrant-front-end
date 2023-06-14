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
          'https://didierlam-server.eddi.cloud/api/products'
        );
        setArticles(response.data.allProducts);
      } catch (error) {
        console.log(error);
      }
    }
    getArticles();
  }, []);

  return (
    <>
      <div id="wrapper">
        <form>
          <p className="Tri">
            Trier par :
            <label htmlFor="Prix croissant" className="categoryName">
              <input type="checkbox" value="increase" />
              <span>Prix croissant</span>
            </label>
            <label htmlFor="Prix décroissant" className="categoryName">
              <input type="checkbox" value="decrease" />
              <span>Prix décroissant</span>
            </label>
            <label htmlFor="Temps restant croissant" className="categoryName">
              <input type="checkbox" />
              <span>Temps restant croissant</span>
            </label>
            <label htmlFor="Temps restant croissant" className="categoryName">
              <input type="checkbox" />
              <span>Temps restant décroissant</span>
            </label>
          </p>
        </form>
      </div>
      <div className="containerCardCat">
        {articles.map((article) => (
          <Link key={article.id} to="/produit/1" className="cardCat">
            <h4 className="pictureName">{article.name}</h4>
            <img
              className="pictureItem"
              src={article.photo}
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
        <div>
          <div>
            <button type="button" className="buttonPage">
              Page précédente
            </button>
            <button type="button" className="buttonPage">
              Page suivante
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
