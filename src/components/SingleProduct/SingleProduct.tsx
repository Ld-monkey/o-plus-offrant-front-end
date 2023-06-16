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
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 1 </td>
              <td className="auction-history-price">635 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 2h00mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 2 </td>
              <td className="auction-history-price">605 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h45mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 3 </td>
              <td className="auction-history-price">577 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h30mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 4 </td>
              <td className="auction-history-price">550 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h10mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 5 </td>
              <td className="auction-history-price">525 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h00mins30sec
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SingleProduct;
