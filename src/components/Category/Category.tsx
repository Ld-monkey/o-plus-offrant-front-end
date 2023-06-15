import { useEffect, useState } from 'react';
import './Category.scss';
import { Link, useParams } from 'react-router-dom';

/**
 * Sort increase price.
 */
function sortIncreasePrice() {
  console.log('sortIncreasePrice');
}

/**
 * Sort decrease price.
 */
function sortDecreasePrice() {
  console.log('sortDecreasePrice');
}

/**
 * Check the checkbox.
 */
function checkCategory() {
  const isChecked = event?.target.checked;
  const value = event?.target.value;

  if (!isChecked) {
    return;
  }

  switch (value) {
    case 'increase':
      sortIncreasePrice();
      break;
    case 'decrease':
      sortDecreasePrice();
      break;
    default:
      console.log('unknow action');
      break;
  }
}

/**
 * Quand cliqué il faut faire apparaitre une pop-up être vous sûr de surenchérir à "Montant+5%"
 * modale/pop up : Confirmez vous votre enchère à Montant+5% ? OUI / ANNULER
 */
function handlePriceMore() {}

interface ArticlesProps {
  id: number;
  name: string;
  photo: string;
  prix_de_depart: string;
  date_de_fin: string;
  montant: string;
}

function Category() {
  const [isChecked, setIsChecked] = useState(false);
  const [articles, setArticles] = useState<ArticlesProps[]>([]);

  const { idCategory } = useParams();

  return (
    <>
      <div id="wrapper">
        <form>
          <p className="Tri">
            Trier par :
            <label htmlFor="Prix croissant" className="categoryName">
              <input
                type="checkbox"
                value="increase"
                onChange={checkCategory}
              />
              <span>Prix croissant</span>
            </label>
            <label htmlFor="prix-decroissant" className="categoryName">
              <input type="checkbox" value="decrease" onClick={checkCategory} />
              <span>Prix décroissant</span>
            </label>
            <label htmlFor="temps-restant-croissant" className="categoryName">
              <input type="checkbox" onClick={checkCategory} />
              <span>Temps restant croissant</span>
            </label>
            <label htmlFor="temps-restant-decroissant" className="categoryName">
              <input type="checkbox" onClick={checkCategory} />
              <span>Temps restant décroissant</span>
            </label>
          </p>
        </form>
      </div>
      <div className="containerCardCat">
        <Link to="/produit/1" className="cardCat">
          <img
            className="pictureItem"
            src="../../src/assets/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
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
