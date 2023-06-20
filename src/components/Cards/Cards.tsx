import { Link } from 'react-router-dom';
import './Cards.scss';
import Card from './Card';

const API = import.meta.env.VITE_AXIOS_SERVER;

interface IRandomItems {
  date_de_fin: string;
  montant: number;
  photo: string | undefined;
  id: number;
  titre: string | undefined;
  nom: string | undefined;
  image: string | undefined;
  alt: string | undefined;
  description: string | undefined;
  prix: number;
  dateFin: string;
}

function Cards({ articles }: { articles: IRandomItems[] }) {
  const lastTwoItems = [
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
  ];

  return (
    <div id="wrapper">
      <div className="cards">
        <h2>Enchères</h2>
        <div className="cards-root">
          <div className="first-card">
            <Card
              id={lastTwoItems[0].id}
              image={lastTwoItems[0].image}
              description={lastTwoItems[0].description}
              title={lastTwoItems[0].titre}
              price={lastTwoItems[0].prix}
              endTime={lastTwoItems[0].dateFin}
            />
          </div>
          <div className="cards-container second-card">
            <Card
              id={lastTwoItems[1].id}
              image={lastTwoItems[1].image}
              description={lastTwoItems[1].description}
              title={lastTwoItems[1].titre}
              price={lastTwoItems[1].prix}
              endTime={lastTwoItems[1].dateFin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
