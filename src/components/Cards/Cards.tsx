import { useEffect, useState } from 'react';
import { IRandomItems } from '../../@types/articles';
import Card from './Card';
import './Cards.scss';

const API = import.meta.env.VITE_AXIOS_SERVER;

function Cards({ articles }: { articles: IRandomItems[] }) {
  return (
    <div className="cards">
      <div className="cards-root">
        <div className="first-card">
          {items.length && (
            <Card
              id={items[0].id}
              image={items[0].image}
              description={items[0].description}
              title={items[0].titre}
              price={items[0].prix}
              endTime={items[0].dateFin}
            />
          )}
        </div>
        <div className="cards-container second-card">
          {items.length && (
            <Card
              id={items[1].id}
              image={items[1].image}
              description={items[1].description}
              title={items[1].titre}
              price={items[1].prix}
              endTime={items[1].dateFin}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
