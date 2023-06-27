import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from '../../api/axios';
import './Articles.scss';
import getFormatDuration from '../../utils/dateFormat';
import { ArticlesProps } from '../../@types/articles';
import handleChangeTimerSort from './sortArticles';

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

  const [page, setPage] = useState(1);
  const resultsPerPage = 9;
  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const hasNextPage = endIndex < filteredArticles.length;
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
            <div className="sort-by-price">
              <span>Trier par :</span>
              <label htmlFor="Prix Croissant" className="categoryName">
                <input
                  type="radio"
                  value="increase"
                  name="Tri"
                  defaultChecked
                  onClick={() =>
                    setArticles(handleSortByPriceIncrease(articles))
                  }
                />
                <span>Prix Croissant</span>
              </label>
              <label htmlFor="Prix Décroissant" className="categoryName">
                <input
                  type="radio"
                  value="decrease"
                  name="Tri"
                  onClick={handleSortByPriceDecrease}
                />
                <span>Prix Décroissant</span>
              </label>
              <label htmlFor="Durée la plus courte" className="categoryName">
                <input
                  type="radio"
                  name="Tri"
                  onChange={() =>
                    setArticles(handleChangeTimerSort(articles, 'increase'))
                  }
                />
                <span>Durée la plus courte</span>
              </label>
              <label htmlFor="Durée la plus longue" className="categoryName">
                <input
                  type="radio"
                  name="Tri"
                  onChange={() =>
                    setArticles(handleChangeTimerSort(articles, 'decrease'))
                  }
                />
                <span>Durée la plus longue</span>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div id="wrapper" className="containerCardCat">
        {filteredArticles.slice(startIndex, endIndex).map((filteredArticle) => {
          const formattedDate = dayjs(filteredArticle.date_de_fin).format(
            'DD-MM-YYYY [à] HH:mm'
          );
          return (
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
                <p className="timerAuction">Date de fin : {formattedDate}</p>
                <p className="liveAuction__proceNow">
                  Prix enchère actuelle : {filteredArticle.montant} €
                  <button type="button" className="liveAuction-button">
                    Surenchérir !
                  </button>
                </p>
              </div>
            </Link>
          );
        })}
        ;
      </div>

      <div id="wrapper">
        <div className="button_container">
          {page > 1 && (
            <button
              type="button"
              className="buttonPage"
              onClick={() => setPage(page - 1)}
            >
              Page précédente
            </button>
          )}
          {hasNextPage && (
            <button
              type="button"
              className="buttonPage"
              onClick={() => setPage(page + 1)} // bloqué plus de serveur back mais ici peut etre mettre une condition au +1 page si filtreredArticles.length
            >
              Page suivante
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Articles;
