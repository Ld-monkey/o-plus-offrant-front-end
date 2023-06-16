import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SingleProduct.scss';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface SingleArticleProps {
  id: number;
  photo: string;
  nom: string;
  description: string;
  prix_de_depart: string;
  date_de_fin: string;
  montant: string;
}

interface SingleArticleHistory {
  article_id: number;
  nom: string;
  prenom: string;
  date: string;
  montant: string;
}

function SingleProduct() {
  const [article, setArticle] = useState<SingleArticleProps>();
  const [articleHistory, setArticleHistory] = useState<SingleArticleHistory[]>(
    []
  );

  const { idArticle } = useParams();

  useEffect(() => {
    async function fetchArticlebyId() {
      const response = await axios.get(
        `https://didierlam-server.eddi.cloud/api/article/${idArticle}`
      );
      setArticle(response.data.article);
      setArticleHistory(response.data.histArticle);
    }
    fetchArticlebyId();
  }, [idArticle]);

  return (
    <div id="wrapper">
      <section className="single-product">
        <div className="single-product-media">
          <img
            src={`https://didierlam-server.eddi.cloud/${article?.photo}`}
            alt={article?.nom}
            className="photo"
          />
          <FontAwesomeIcon icon={faStar} className="fave-icon" />
        </div>
        <div className="single-product-details">
          <h2 className="single-product-title">{article?.nom}</h2>
          <p className="single-product-description">{article?.description}</p>
          <div className="auction-infos">
            <span className="auction-original-price">
              Prix de départ: {article?.prix_de_depart} Tokens
            </span>
            <span className="auction-remaining-time">
              Temps restant : {article?.date_de_fin}
            </span>
          </div>
          <div className="auction-amount">
            <span className="auction-current-price">
              Mise actuelle : {article?.montant} Tokens
            </span>
            <button className="participate-btn" type="button">
              Enchérir
            </button>
          </div>
        </div>
      </section>

      <section className="auction-history">
        <h2 className="auction-history-title">Historique des enchères</h2>
        <table className="auction-history-table">
          <thead>
            <tr>
              <td>Nom de l&apos;enchérisseur</td>
              <td>Montant de l&apos;enchère</td>
              <td>Date de l&apos;enchère</td>
            </tr>
          </thead>
          <tbody>
            {articleHistory.map((history) => {
              const firstLetter = history.nom.charAt(0);
              return (
                <tr key={history.article_id}>
                  <td className="auction-history-auctioner">
                    {history.prenom} {firstLetter}.
                  </td>
                  <td className="auction-history-price">
                    {history.montant} Tokens
                  </td>
                  <td className="auction-history-date">{history.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SingleProduct;
