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
  /**
   * Get two indexes randomly.
   * @param totalArticle { number } - Total number of items.
   * @returns Return an array with 2 indexes (e.g [2, 8]).
   */
  const getRandomItems = (totalArticle: number) => {
    const totalArticles = totalArticle;
    const indexArticles: number[] = [];

    while (indexArticles.length !== 2) {
      const index = Math.floor(Math.random() * totalArticles) + 1;
      if (indexArticles.length === 0) {
        indexArticles.push(index);
      } else if (indexArticles[0] !== index) {
        indexArticles.push(index);
      }
    }

    return indexArticles;
  };

  const [firstItem, secondItem] = getRandomItems(articles.length);

  const lastTwoItems = [
    {
      id: articles[firstItem].id,
      titre: articles[firstItem].nom,
      image: `${API}${articles[firstItem].photo}`,
      alt: articles[firstItem].nom,
      description: articles[firstItem].description,
      prix: articles[firstItem].montant,
      dateFin: articles[firstItem].date_de_fin,
    },
    {
      id: articles[secondItem].id,
      titre: articles[secondItem].nom,
      image: `${API}${articles[secondItem].photo}`,
      alt: articles[secondItem].nom,
      description: articles[secondItem].description,
      prix: articles[secondItem].montant,
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
