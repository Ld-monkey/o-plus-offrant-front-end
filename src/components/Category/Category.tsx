import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Category.scss';

/**
 * Sort increase price.
 */
// function sortIncreasePrice() {
//   console.log('sortIncreasePrice');
// }

/**
 * Sort decrease price.
 */
// function sortDecreasePrice() {
//   console.log('sortDecreasePrice');
// }

/**
 * Check the checkbox.
 */
// function checkCategory() {
//   const isChecked = event?.target.checked;
//   const value = event?.target.value;

//   if (!isChecked) {
//     return;
//   }

//   switch (value) {
//     case 'increase':
//       sortIncreasePrice();
//       break;
//     case 'decrease':
//       sortDecreasePrice();
//       break;
//     default:
//       console.log('unknow action');
//       break;
//   }
// }

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
  const [checkedValues, setCheckedValues] = useState<string>();
  const [articles, setArticles] = useState<ArticlesProps[]>([]);

  const { idCategory } = useParams();

  useEffect(() => {
    async function fetchArticles() {
      const apiReq = idCategory
        ? `https://didierlam-server.eddi.cloud/api/category/${idCategory}/articles`
        : `https://didierlam-server.eddi.cloud/api/articles`;
      try {
        const response = await axios.get(apiReq);
        if (idCategory) {
          setArticles(response.data.filteredArticles);
        } else {
          setArticles(response.data.allArticles);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, [idCategory]);

  function handleChangeCategory(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedValues(value);
    }
  }

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
          <div className="Tri">
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
          </div>
        </form>
      </div>
      <div className="containerCardCat">
        {articles.map((article) => (
          <Link key={article.id} to="/produit/1" className="cardCat">
            <img
              className="pictureItem"
              src={`https://didierlam-server.eddi.cloud/${article.photo}`}
              alt={article.name}
            />
            <h3 className="nameItem">{article.name}</h3>
            <p className="priceItem">
              Prix initial : {article.prix_de_depart}€
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
