import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getFormatDuration from '../../utils/dateFormat';
import './Cards.scss';

interface ICard {
  id: number;
  image: string | undefined;
  description: string | undefined;
  title: string | undefined;
  price: number;
  endTime: string;
}

function Card({ id, image, description, title, price, endTime }: ICard) {
  const [countdown, setCountdown] = useState('');

  /**
   * Display and calculate the countdown for an item.
   */
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const formatCountdown = getFormatDuration(endTime);
      setCountdown(formatCountdown);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [endTime]);

  return (
    <div className="cards-container">
      <Link to={`produit/${id}`} className="card">
        <div className="card-img">
          <span className="current-auction">Dernière chance</span>
          <img src={image} alt={description} />
        </div>
        <div className="card-legend">
          <p>{title}</p>
          <div className="card-legend__data">
            <span className="card-legend__tokens">{price} €</span>
            <span className="card-legend__times">{countdown}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
