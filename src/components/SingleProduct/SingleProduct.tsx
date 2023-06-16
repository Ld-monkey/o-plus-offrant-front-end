import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

/*
Package to format datetime and creating countdown
*/
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import duration from 'dayjs/plugin/duration';

import './SingleProduct.scss';

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
  utilisateur_id: number;
  nom: string;
  prenom: string;
  date: string;
  montant: string;
}

dayjs.extend(duration);

function SingleProduct() {
  const [article, setArticle] = useState<SingleArticleProps>();
  const [articleHistory, setArticleHistory] = useState<SingleArticleHistory[]>(
    []
  );
  const [countdown, setCountdown] = useState('');

  const { idArticle } = useParams();
  const targetedDate = article?.date_de_fin;

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

  useEffect(() => {
    function calculateCountdown() {
      // const formattedDate = dayjs(targetedDate).format('DD-MM-YYYY [at] HH:mm');
      const now = dayjs();
      const auctionTargetDate = dayjs(targetedDate);
      const auctionDuration = dayjs.duration(auctionTargetDate.diff(now));
      const formattedCountdown = `${auctionDuration.days()}d ${auctionDuration.hours()}h ${auctionDuration.minutes()}m ${auctionDuration.seconds()}s`;
      setCountdown(formattedCountdown);
    }
    const countdownInterval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [targetedDate]);

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
              Temps restant : {countdown}
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
              const formattedDate = dayjs(history.date).format(
                'DD-MM-YYYY [at] HH:mm'
              );
              return (
                <tr key="abc">
                  {/* EN ATTENTE DE L'ID UNIQUE DES BACKS */}
                  <td className="auction-history-auctioner">
                    {history.prenom} {firstLetter}.
                  </td>
                  <td className="auction-history-price">
                    {history.montant} Tokens
                  </td>
                  <td className="auction-history-date">{formattedDate}</td>
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
