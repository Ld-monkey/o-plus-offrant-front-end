import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IRandomItems } from '../../@types/articles';
import Card from '../Cards/Card';
import '../Cards/Cards.scss';
import './Carousel.scss';

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
  const mostRecentItems = articles ? articles.slice(0, 5) : undefined;
  const olderItems = articles ? articles.slice(6, 12) : undefined;
  return (
    <div id="wrapper">
      <h2 className="title-carousel">Ventes courtes</h2>
      {articles && (
        <Carousel
          responsive={responsive}
          containerClass="carousel-container"
          partialVisible={false}
        >
          {mostRecentItems &&
            mostRecentItems.map((item) => (
              <div key={item.id}>
                <Card
                  id={item.id}
                  description=""
                  photo={item.photo}
                  nom={item.nom}
                  montant={item.montant}
                  date_de_fin={item.date_de_fin}
                  label={undefined}
                />
              </div>
            ))}
        </Carousel>
      )}
      <h2 className="title-carousel">Ventes longues</h2>
      {articles && (
        <Carousel responsive={responsive}>
          {olderItems &&
            olderItems.map((item) => (
              <div key={item.id}>
                <Card
                  id={item.id}
                  description=""
                  photo={item.photo}
                  nom={item.nom}
                  montant={item.montant}
                  date_de_fin={item.date_de_fin}
                  label={undefined}
                />
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselItem;
