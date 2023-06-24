import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getFormatDuration from '../../utils/dateFormat';
import './Cards.scss';

const API = import.meta.env.VITE_AXIOS_SERVER;

interface ICard {
  id: number;
  photo: string | undefined;
  description: string | undefined;
  nom: string | undefined;
  montant: number;
  date_de_fin: string;
  label: undefined | string;
}

function Card({
  id,
  photo,
  description,
  nom,
  montant,
  date_de_fin,
  label,
}: ICard) {
  const [countdown, setCountdown] = useState('');

  /**
   * Display and calculate the countdown for an item.
   */
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const formatCountdown = getFormatDuration(date_de_fin);
      setCountdown(formatCountdown);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [date_de_fin]);

  const imageUrl = photo ? `${API}${photo}` : undefined;

  return (
    <div className="cards-container">
      <Link to={`produit/${id}`} className="card">
        <div className="card-img">
          {label && <span className="current-auction">{label}</span>}
          <img src={imageUrl} alt={description} />
        </div>
        <div className="card-legend">
          <p>{nom}</p>
          <div className="card-legend__data">
            <span className="card-legend__tokens">{montant} €</span>
            <span className="card-legend__times">{countdown}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
