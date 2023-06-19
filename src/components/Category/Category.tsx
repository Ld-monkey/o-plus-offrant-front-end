import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Category.scss';

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
  categorie_id: number;
  categorie: string; // category/../articles
  categorie_nom: string; // api/allArticles
}

interface CategoriesProps {
  id: number;
  nom: string;
}
type CategoryChecked = string;

function Category() {
  const [articles, setArticles] = useState<ArticlesProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesChecked, setCategoriesChecked] = useState<CategoryChecked[]>(
    []
  );
  // const [filteredArticles, setFilteredArticles] = useState<ArticlesProps[]>([]);

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
        setCategories(response.data.allCategories);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    fetchArticles();
  }, [idCategory]);

  const filteredArticles = articles.filter((article) =>
    categoriesChecked.length > 0
      ? categoriesChecked.some((categoryChecked) =>
          article.categorie_nom.includes(categoryChecked)
        )
      : articles
  );

  const handleChangeCategoryChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;

    if (checked) {
      setCategoriesChecked([...categoriesChecked, value]);
    } else {
      setCategoriesChecked(
        categoriesChecked.filter((categorie) => categorie !== value)
      );
    }
  };

  return (
    <>
      <div id="wrapper">
        <form className="Sort_Choice">
          {categories.map((categorie) => (
            <div className="Category_Choice" key={categorie.id}>
              <label htmlFor="">
                <input
                  type="checkbox"
                  value={categorie.nom}
                  onChange={handleChangeCategoryChecked}
                  checked={Number(idCategory) === categorie.id}
                />
                <span>{categorie.nom}</span>
              </label>
            </div>
          ))}
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
                <input
                  type="radio"
                  name="TriTimer"
                  // checked
                  // onChange={handleChangeTimerSort}
                />
                <span>La plus courte</span>
              </label>
              <label htmlFor="La plus longue" className="categoryName">
                <input
                  type="radio"
                  name="TriTimer"
                  // onChange={handleChangeTimerSort}
                />
                <span>La plus longue</span>
              </label>
            </div>
          </div>
        </form>
      </div>
      {categoriesChecked ? (
        <div className="containerCardCat">
          {filteredArticles.map((filteredArticle) => (
            <Link key={filteredArticle.id} to="/produit/1" className="cardCat">
              <img
                className="pictureItem"
                src={`https://didierlam-server.eddi.cloud/${filteredArticle.photo}`}
                alt={filteredArticle.name}
              />
              <h3 className="nameItem">{filteredArticle.name}</h3>
              <p className="priceItem">
                Prix initial : {filteredArticle.prix_de_depart}€
              </p>

              <div className="liveAuction">
                <p className="timerAuction">
                  Temps restant : {filteredArticle.date_de_fin}
                </p>
                <p className="liveAuction__proceNow">
                  Prix enchère actuelle : {filteredArticle.montant} €
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
      ) : (
        <div className="containerCardCat">
          {filteredArticles.map((article) => (
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
      )}
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

//     function handleChangePriceSort() {
//       articles.sort((a, b) => a.montant - b.montant); //Tri Croissant
//       articles.sort((a, b) => b.montant - a.montant); //Tri Décroissant
//     }

//     function handleChangeTimerSort() {
//       articles.sort((a, b) => a.date_de_fin - b.date_de_fin); //Temps Restant Croissant
//       articles.sort((a, b) => b.date_de_fin - a.date_de_fin); //Temps Restant Décroissant
//     }
//   }
