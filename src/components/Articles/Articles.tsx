import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import './Articles.scss';

interface ArticlesProps {
  id: number;
  nom: string;
  photo: string;
  prix_de_depart: string;
  date_de_fin: string;
  montant: string;
  categorie_id: number;
  categorie: string;
  categorie_nom: string;
}

interface CategoriesProps {
  id: number;
  nom: string;
}
type CategoryChecked = string;

function Articles() {
  const [articles, setArticles] = useState<ArticlesProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesChecked, setCategoriesChecked] = useState<CategoryChecked[]>(
    []
  );
  const location = useLocation();

  const categoryClicked = location.state ? location.state.nameCategory : '';

  function handleSortByPriceIncrease(items: any) {
    const sortedArticlesIncrease = [...items];
    sortedArticlesIncrease.sort(
      (a, b) => Number(a.montant) - Number(b.montant)
    );
    return sortedArticlesIncrease;
  }

  useEffect(() => {
    async function fetchArticles() {
      const apiReq = `/api/articles`;

      try {
        const response = await axios.get(apiReq);

        // setArticles(response.data.allArticles);
        const sortArticles = handleSortByPriceIncrease(
          response.data.allArticles
        );
        setArticles(sortArticles);

        setCategories(response.data.allCategories);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    if (categoryClicked !== '') {
      setCategoriesChecked([categoryClicked]);
    }

    fetchArticles();
  }, [categoryClicked]);

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

  const handleSortByPriceDecrease = (): void => {
    const sortedArticlesDecrease = [...articles];

    sortedArticlesDecrease.sort(
      (a, b) => Number(b.montant) - Number(a.montant)
    );
    setArticles(sortedArticlesDecrease);
  };

  /**
   * Sort items based on end date time.
   * @param items - All articles.
   * @param action - 2 types of actions 'increase' or 'decrease'
   */
  const handleChangeTimerSort = (
    items: ArticlesProps[],
    action: 'increase' | 'decrease'
  ): void => {
    const now = Number(new Date());
    const sortedArticles = [...articles];
    if (action === 'increase') {
      sortedArticles.sort(
        (a, b) =>
          Math.abs(Number(new Date(a.date_de_fin)) - now) -
          Math.abs(Number(new Date(b.date_de_fin)) - now)
      );
    } else {
      sortedArticles.sort(
        (a, b) =>
          Math.abs(Number(new Date(b.date_de_fin)) - now) -
          Math.abs(Number(new Date(a.date_de_fin)) - now)
      );
    }
    setArticles(sortedArticles);
  };

  //  const [sortvalue; Setsortvalue] = useState("");
  //   const sortOptions = ["montant"]
  return (
    <>
      <div id="wrapper">
        <form className="Sort_Choice">
          <div className="Category_Choice">
            {categories.map((categorie) => (
              <div className="Category_Choice" key={categorie.id}>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    value={categorie.nom}
                    onChange={handleChangeCategoryChecked}
                    checked={categoriesChecked.includes(categorie.nom)}
                  />
                  <span>{categorie.nom}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="Sort">
            <div>
              <span>Trier par :</span>
              <label htmlFor="Croissant" className="categoryName">
                <input
                  type="radio"
                  value="increase"
                  name="TriPrice"
                  defaultChecked
                  onClick={() =>
                    setArticles(handleSortByPriceIncrease(articles))
                  }
                />
                <span>Croissant</span>
              </label>
              <label htmlFor="Décroissant" className="categoryName">
                <input
                  type="radio"
                  value="decrease"
                  name="TriPrice"
                  onClick={handleSortByPriceDecrease}
                />
                <span>Décroissant</span>
              </label>
            </div>
            <div>
              <label htmlFor="La plus courte" className="categoryName">
                <input
                  type="radio"
                  name="TriTimer"
                  onChange={() => handleChangeTimerSort(articles, 'increase')}
                />
                <span>La plus courte</span>
              </label>
              <label htmlFor="La plus longue" className="categoryName">
                <input
                  type="radio"
                  name="TriTimer"
                  onChange={() => handleChangeTimerSort(articles, 'decrease')}
                />
                <span>La plus longue</span>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div id="wrapper" className="containerCardCat">
        {filteredArticles.map((filteredArticle) => (
          <Link
            key={filteredArticle.id}
            to={`/article/${filteredArticle.id}`}
            className="cardCat"
          >
            <h3 className="nameItem">{filteredArticle.nom}</h3>
            <div className="imgContainer">
              <img
                className="pictureItem"
                src={`https://didierlam-server.eddi.cloud/${filteredArticle.photo}`}
                alt={filteredArticle.nom}
              />
            </div>
            <p className="priceItem">
              Prix initial : {filteredArticle.prix_de_depart}€
            </p>

            <div className="liveAuction">
              <p className="timerAuction">
                Temps restant : {filteredArticle.date_de_fin}
              </p>
              <p className="liveAuction__proceNow">
                Prix enchère actuelle : {filteredArticle.montant} €
                <button type="button" className="liveAuction-button">
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

export default Articles;
