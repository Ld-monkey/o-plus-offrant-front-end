import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Link } from 'react-router-dom';
import { IRandomItems } from '../../@types/articles';

import Card from '../Cards/Card';
import '../Cards/Cards.scss';

const API = import.meta.env.VITE_AXIOS_SERVER;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 960, min: 577 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 2,
  },
};

function CarouselItem({ articles }: { articles: IRandomItems[] }) {
  const mostRecentItems = articles.slice(0, 2);
  const olderItems = articles.slice(6, 12);
  return (
    <div id="wrapper">
      <h2>Ventes courtes</h2>
      {/* <Carousel responsive={responsive}></Carousel> */}

      <div className="cards">
        <div className="cards-root">
          {mostRecentItems.map((item) => (
            <div key={item.id}>
              <Card
                id={item.id}
                description=""
                image={`${API}${item.photo}`}
                title={item.nom}
                price={item.montant}
                endTime={item.date_de_fin}
              />
            </div>
          ))}
        </div>
      </div>

      <h2>Ventes longues</h2>
      <Carousel responsive={responsive}>
        {olderItems.map((item) => (
          <div key={item.id} style={{ height: '100%' }}>
            <Card
              id={item.id}
              description=""
              image={`${API}${item.photo}`}
              title={item.nom}
              price={item.montant}
              endTime={item.date_de_fin}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItem;
