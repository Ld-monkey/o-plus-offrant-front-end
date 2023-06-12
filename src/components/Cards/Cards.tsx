import './Cards.scss';

function Cards() {
  return (
    <div id="wrapper">
      <div className="cards">
        <h2>Enchères</h2>
        <div className="cards-root">
          <div className="cards-container first-card">
            <div className="card">
              <div className="card-img">
                <span className="current-auction">Dernière chance</span>
                <img src="../../src/assets/images/bike.jpg" alt="bike" />
              </div>
              <div className="card-legend">
                <p>Vélo pour tomber (1,80m minimum)</p>
                <div className="card-legend__data">
                  <span>100 Tokens</span>
                  <span>00:01:20</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cards-container second-card">
            <div className="card">
              <div className="card-img">
                <span className="current-auction">Dernière chance</span>
                <img src="../../src/assets/images/banane.jpg" alt="bike" />
              </div>
              <div className="card-legend">
                <p>Banane (sans pesticide)</p>
                <div className="card-legend__data">
                  <span>100 Tokens</span>
                  <span>00:01:20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
