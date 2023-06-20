import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import bike from '../../assets/images/bike.jpg';
import banana from '../../assets/images/banane.jpg';
import '../Cards/Cards.scss';

function CarouselItem() {
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
  return (
    <div id="wrapper">
      <h3>Ventes courtes</h3>
      <Carousel responsive={responsive}>
        <div>
          <div
            className="cards-container first-card"
            style={{ backgroundColor: '#FDF5EA' }}
          >
            <Link to="produit/1" className="card">
              <div className="card-img">
                <img src={bike} alt="bike" />
              </div>
              <div className="card-legend">
                <p>Vélo (en carbone)</p>
                <div className="card-legend__data">
                  <span className="card-legend__tokens">100 Tokens</span>
                  <span className="card-legend__times">00:01:20</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <img src={banana} alt="banana" />
        </div>
        <div>
          <img src={bike} alt="bike" />
        </div>
        <div>
          <img src={banana} alt="banana" />
        </div>
        <div>
          <img src={bike} alt="bike" />
        </div>
      </Carousel>

      <h3>Ventes longues</h3>
      <Carousel responsive={responsive} centerMode={true}>
        <div>
          <div
            className="cards-container first-card"
            style={{ backgroundColor: '#FDF5EA' }}
          >
            <Link to="produit/1" className="card">
              <div className="card-img">
                <img src={bike} alt="bike" />
              </div>
              <div className="card-legend">
                <p>Vélo (en carbone)</p>
                <div className="card-legend__data">
                  <span className="card-legend__tokens">100 Tokens</span>
                  <span className="card-legend__times">00:01:20</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <img src={banana} alt="banana" />
        </div>
        <div>
          <img src={bike} alt="bike" />
        </div>
        <div>
          <img src={banana} alt="banana" />
        </div>
        <div>
          <img src={bike} alt="bike" />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselItem;
