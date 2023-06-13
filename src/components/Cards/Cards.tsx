import { Link } from 'react-router-dom';
import './Cards.scss';

function Cards() {
  return (
    <div id="wrapper">
      <div className="cards">
        <h2>Enchères</h2>
        <div className="cards-root">
          <div className="cards-container first-card">
            <Link to="produit/1" className="card">
              <div className="card-img">
                <span className="current-auction">Dernière chance</span>
                <img src="../../src/assets/images/bike.jpg" alt="bike" />
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
          <div className="cards-container second-card">
            <Link to="produit/2" className="card">
              <div className="card-img">
                <span className="current-auction">Dernière chance</span>
                <img src="../../src/assets/images/banane.jpg" alt="bike" />
              </div>
              <div className="card-legend">
                <p>Banane (sans pesticide)</p>
                <div className="card-legend__data">
                  <span className="card-legend__tokens">100 Tokens</span>
                  <span className="card-legend__times">00:01:20</span>
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
