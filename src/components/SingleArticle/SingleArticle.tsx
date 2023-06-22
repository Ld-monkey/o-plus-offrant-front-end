import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
/**
 * Package to format datetime and creating countdown
 */
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import duration from 'dayjs/plugin/duration';

import { useAppSelector } from '../../hooks/redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';
import './SingleArticle.scss';

interface SingleArticleProps {
  id: number;
  photo: string;
  nom: string;
  description: string;
  prix_de_depart: number;
  date_de_fin: string;
  montant: number;
  utilisateur_vente_id: number;
}

interface SingleArticleHistory {
  id: number;
  nom: string;
  prenom: string;
  date: string;
  montant: number;
  utilisateur_id: number;
}

dayjs.extend(duration);

function SingleArticle() {
  const privateAxios = useAxiosPrivate();
  const userId = useAppSelector((state) => state.user.id);
  const userLogged = useAppSelector((state) => state.user.logged);

  const [article, setArticle] = useState<SingleArticleProps | undefined>(
    undefined
  );
  const [articleHistory, setArticleHistory] = useState<SingleArticleHistory[]>(
    []
  );
  const [countdown, setCountdown] = useState('');
  const [auctionFinished, setAuctionFinished] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [lastBidder, setLastBidder] = useState<number | null>(null);

  const { idArticle } = useParams();

  useEffect(() => {
    async function fetchArticlebyId() {
      const response = await axios.get(`/api/article/${idArticle}`);
      setArticle(response.data.article);
      const articleHistories = response.data.histArticle;
      const sortedArticleHistories = articleHistories.sort(
        (a: { montant: number }, b: { montant: number }) =>
          b.montant - a.montant
      );
      if (sortedArticleHistories.length > 10) {
        const latestEntries = sortedArticleHistories.slice(0, 10);
        setArticleHistory(latestEntries);
      } else {
        setArticleHistory(sortedArticleHistories);
      }
      if (sortedArticleHistories.length) {
        setLastBidder(sortedArticleHistories[0].utilisateur_id);
      }
    }
    fetchArticlebyId();
  }, [idArticle]);

  /**
   * Timer
   */
  useEffect(() => {
    function calculateCountdown() {
      const now = dayjs();
      const auctionTargetDate = dayjs(article?.date_de_fin);
      const auctionDuration = dayjs.duration(auctionTargetDate.diff(now));

      const days = auctionDuration.days();
      const hours = auctionDuration.hours();
      const minutes = auctionDuration.minutes();
      const seconds = auctionDuration.seconds();

      if (days === 1) {
        setCountdown(`${days} jour ${hours}:${minutes}:${seconds}`);
      } else if (days === 0) {
        setCountdown(`${hours}:${minutes}:${seconds}`);
      } else {
        setCountdown(`${days} jours ${hours}:${minutes}:${seconds}`);
      }

      if (auctionDuration.asMilliseconds() <= 0) {
        setAuctionFinished(true);
      }
    }
    const countdownInterval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [article?.date_de_fin]);

  /**
   * Send updated data to the API
   */
  async function handleAuctionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (article) {
      try {
        await privateAxios.post(`/api/auction`, {
          prix: Math.round(article.montant * (1 + 5 / 100)),
          articleId: idArticle,
          acheteurId: userId,
        });
      } catch (error) {
        console.error('Veuillez vous reconnecter', error);
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
                  {auctionFinished
                    ? "L'enchère est terminée 🥺"
                    : `Temps restant: ${countdown.replace(
                        /:(\d)(?!\d)/g,
                        ':0$1'
                      )}`}
                </span>
              </div>
              <div className="auction-amount">
                <span className="auction-current-price">
                  Mise actuelle : {article.montant}€
                </span>
                {auctionFinished || userId === article.utilisateur_vente_id ? (
                  <button
                    className="participate-btn disabled"
                    type="button"
                    disabled
                  >
                    Enchérir
                  </button>
                ) : (
                  <button
                    className="participate-btn"
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Enchérir
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="auction-history">
            <h2 className="auction-history-title">Historique des enchères</h2>
            {articleHistory.length ? (
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
                          {history.prenom} {firstLetter} .
                        </td>
                        <td className="auction-history-price">
                          {history.montant}€
                        </td>
                        <td className="auction-history-date">
                          {formattedDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="auction-no-history">Soyez le premier à enchérir</p>
            )}
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
              <form method="post" onSubmit={handleAuctionSubmit}>
                <h2 className="auction-confirm-title">
                  Êtes-vous sûr.e de vouloir enchérir{' '}
                  {Math.round(article.montant * (1 + 5 / 100))}€ sur cet article
                  ?
                </h2>
                {!userLogged && (
                  <p className="error-message">
                    Veuillez-vous connecter pour pouvoir enchérir sur cet
                    article.
                  </p>
                )}

                {lastBidder === userId && (
                  <p className="error-message">
                    Vous avez déjà la meilleure enchère.
                  </p>
                )}

                {lastBidder !== userId &&
                  userLogged &&
                  userId !== article.utilisateur_vente_id && (
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
                  )}
                {(!userLogged ||
                  lastBidder === userId ||
                  (userLogged && userId === article.utilisateur_vente_id)) && (
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
                  </div>
                )}
              </form>
            </div>
          </>
        )}
      </>
    );
  }
  return (
    <div id="wrapper">
      <p className="not-found">
        Le produit que vous recherchez n&apos;existe pas.
      </p>
    </div>
  );
}

export default SingleArticle;
