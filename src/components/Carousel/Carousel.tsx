import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ArticlesProps, IRandomItems } from '../../@types/articles';
import Card from '../Cards/Card';
import '../Cards/Cards.scss';
import './Carousel.scss';
import handleChangeTimerSort from '../Articles/sortArticles';

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
    breakpoint: { max: 576, min: 381 },
    items: 2,
  },
  verySmallScreen: {
    breakpoint: { max: 380, min: 0 },
    items: 1,
  },
};

function CarouselItem({ articles }: { articles: ArticlesProps[] }) {
  const currentArticles = handleChangeTimerSort(articles, 'increase');
  const oldArticles = handleChangeTimerSort(articles, 'decrease');

  const mostRecentItems = articles ? currentArticles.slice(0, 5) : undefined;
  const olderItems = articles ? oldArticles.slice(0, 5) : undefined;
  return (
    <div id="wrapper">
      <h2 className="title-carousel">Ventes courtes</h2>
      {articles && (
        <Carousel responsive={responsive} containerClass="carousel-container">
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
        <Carousel responsive={responsive} containerClass="carousel-container">
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
