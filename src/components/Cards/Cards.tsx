import { Link } from 'react-router-dom';
import './Cards.scss';
import { useEffect, useState } from 'react';
import getFormatDuration from '../../utils/dateFormat';

const API = import.meta.env.VITE_AXIOS_SERVER;

function Cards({ articles }: { articles: [] | undefined }) {
  const [countdown, setCountdown] = useState([]);
  const lastTwoItems = articles
    ? [
        {
          id: articles[0].id,
          titre: articles[0].nom,
          image: `${API}${articles[0].photo}`,
          alt: articles[0].nom,
          description: articles[0].description,
          prix: articles[0].montant,
          dateFin: articles[0].date_de_fin,
        },
        {
          id: articles[1].id,
          titre: articles[1].nom,
          image: `${API}${articles[1].photo}`,
          alt: articles[1].nom,
          description: articles[1].description,
          prix: articles[1].montant,
          dateFin: '2023-10-25T01:00:00.000Z',
        },
      ]
    : [];
  //console.log(lastTwoItems);

  /**
   * Display and calculate the countdown for an item.
   */
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const formatCountdown1 = getFormatDuration(lastTwoItems[0].dateFin);
      const formatCountdown2 = getFormatDuration(lastTwoItems[1].dateFin);
      setCountdown([formatCountdown1, formatCountdown2]);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [lastTwoItems]);

  return (
    <div id="wrapper">
      <div className="cards">
        <h2>Enchères</h2>
        <div className="cards-root">
          <div className="cards-container first-card">
            <Link to={`produit/${lastTwoItems[0].id}`} className="card">
              <div className="card-img">
                <span className="current-auction">Dernière chance</span>
                <img src={lastTwoItems[0].image} alt={lastTwoItems[0].alt} />
              </div>
              <div className="card-legend">
                <p>{lastTwoItems[0].titre}</p>
                <div className="card-legend__data">
                  <span className="card-legend__tokens">
                    {lastTwoItems[0].prix} €
                  </span>
                  <span className="card-legend__times">{countdown[0]}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="cards-container second-card">
            <Link to={`produit/${lastTwoItems[1].id}`} className="card">
              <div className="card-img">
                <span className="current-auction">Recommandé</span>
                <img src={lastTwoItems[1].image} alt={lastTwoItems[1].alt} />
              </div>
              <div className="card-legend">
                <p>{lastTwoItems[1].titre}</p>
                <div className="card-legend__data">
                  <span className="card-legend__tokens">
                    {lastTwoItems[1].prix} €
                  </span>
                  <span className="card-legend__times">{countdown[1]}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
