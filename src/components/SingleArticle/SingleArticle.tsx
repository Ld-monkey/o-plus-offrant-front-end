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

import './SingleArticle.scss';

interface SingleArticleProps {
  id: number;
  photo: string;
  nom: string;
  description: string;
  prix_de_depart: number;
  date_de_fin: string;
  montant: number;
}

interface SingleArticleHistory {
  id: number;
  nom: string;
  prenom: string;
  date: string;
  montant: number;
}

dayjs.extend(duration);

function SingleArticle() {
  const [article, setArticle] = useState<SingleArticleProps | undefined>(
    undefined
  );
  const [articleHistory, setArticleHistory] = useState<SingleArticleHistory[]>(
    []
  );
  const [countdown, setCountdown] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { idArticle } = useParams();

  useEffect(() => {
    async function fetchArticlebyId() {
      const response = await axios.get(
        `https://didierlam-server.eddi.cloud/api/article/${idArticle}`
      );
      setArticle(response.data.article);
      const articleHistories = response.data.histArticle;
      if (articleHistories.length > 10) {
        const latestEntries = articleHistories.slice(-10);
        setArticleHistory(latestEntries);
      } else {
        setArticleHistory(response.data.histArticle);
      }
    }
    fetchArticlebyId();
  }, [idArticle]);

  /*
  Timer
  */
  useEffect(() => {
    function calculateCountdown() {
      const now = dayjs();
      const auctionTargetDate = dayjs(article?.date_de_fin);
      const auctionDuration = dayjs.duration(auctionTargetDate.diff(now));
      const formattedCountdown = `${auctionDuration.days()} jours ${auctionDuration.hours()}:${auctionDuration.minutes()}:${auctionDuration.seconds()}`;
      setCountdown(formattedCountdown);
    }
    const countdownInterval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [article?.date_de_fin]);

  /*
  Send updated data to the API
  */
  async function handleAuctionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: si le client est connecté, on ajoute son id dans le json qu'on envoie au back, sinon l'inviter à se connecter / lui ouvrir la modale de connexion
    if (article) {
      try {
        await axios.post(`https://didierlam-server.eddi.cloud/api/auction`, {
          prix: Math.round(article.montant * (1 + 5 / 100)),
          articleId: idArticle,
          acheteurId: 2,
        });
      } catch (error) {
        console.error(error);
      }
    }
    setOpenModal(false);
  }

  if (article) {
    return (
      <>
        <div id="wrapper">
          <section className="single-product">
            <div className="single-product-media">
              <img
                src={`https://didierlam-server.eddi.cloud/${article.photo}`}
                alt={article.nom}
                className="photo"
              />
              <FontAwesomeIcon icon={faStar} className="fave-icon" />
            </div>
            <div className="single-product-details">
              <h2 className="single-product-title">{article.nom}</h2>
              <p className="single-product-description">
                {article.description}
              </p>
              <div className="auction-infos">
                <span className="auction-original-price">
                  Prix de départ: {article.prix_de_depart}€
                </span>
                <span className="auction-remaining-time">
                  Temps restant : {countdown}
                </span>
              </div>
              <div className="auction-amount">
                <span className="auction-current-price">
                  Mise actuelle : {article.montant}€
                </span>
                <button
                  className="participate-btn"
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
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
                    'DD-MM-YYYY [à] HH:mm'
                  );
                  return (
                    <tr key={history.id}>
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
        {openModal && (
          <>
            <div
              className={
                openModal
                  ? 'entire-shadow-screen is-active'
                  : 'entire-shadow-screen'
              }
              onClick={() => {
                setOpenModal(false);
              }}
              role="button"
              aria-label="confirm-auction"
              aria-hidden="true"
            />
            <div
              className={
                openModal ? 'modal-auction is-active' : 'modal-auction'
              }
            >
              <form onSubmit={handleAuctionSubmit}>
                <h2 className="auction-confirm-title">
                  Êtes-vous sûr.e de vouloir enchérir{' '}
                  {Math.round(article.montant * (1 + 5 / 100))}€ sur cet article
                  ?
                </h2>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="modal-confirm-btn">
                    Confirmer
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </>
    );
  }
  return <p>Le produit que vous recherchez n&apos;existe pas.</p>;
}

export default SingleArticle;
