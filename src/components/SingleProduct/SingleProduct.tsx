import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SingleProduct.scss';
import { faStar } from '@fortawesome/free-regular-svg-icons';

function SingleProduct() {
  return (
    <div id="wrapper">
      <section className="single-product">
        <div className="single-product-media">
          <img
            src="https://www.slate.fr/sites/default/files/styles/1060x523/public/kbo-bike-6s20vsn5gsy-unsplash.jpg"
            alt="product"
            className="photo"
          />
          <FontAwesomeIcon icon={faStar} className="fave-icon" />
        </div>
        <div className="single-product-details">
          <h2 className="single-product-title">Titre du produit</h2>
          <p className="single-product-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            eos eaque laboriosam eius pariatur blanditiis vitae sed temporibus
            cumque ratione ducimus repellendus ex, quaerat quae consequuntur,
            saepe necessitatibus? Explicabo debitis ducimus quis praesentium
            officia necessitatibus pariatur incidunt minima libero ex cumque, in
            consequatur esse cum eaque sint reiciendis ad iste
          </p>
          <div className="auction-infos">
            <span className="auction-original-price">
              Prix de départ: 500 Tokens
            </span>
            <span className="auction-remaining-time">
              Temps restant : 01:59:00
            </span>
          </div>
          <div className="auction-amount">
            <span className="auction-current-price">
              Mise actuelle : 667 Tokens
            </span>
            <button className="participate-btn" type="button">
              Enchérir
            </button>
          </div>
        </div>
      </section>

      <section className="auction-history">
        {/* GRID ? */}

        <h2 className="auction-history-title">Historique des enchères</h2>
        <table className="auction-history-table">
          <thead>
            <tr>
              <td>Nom de l&apos;enchérisseur</td>
              <td>Montant de l&apos;enchère</td>
              <td>Date de l&apos;enchère</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 1 </td>
              <td className="auction-history-price">635 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 2h00mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 2 </td>
              <td className="auction-history-price">605 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h45mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 3 </td>
              <td className="auction-history-price">577 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h30mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 4 </td>
              <td className="auction-history-price">550 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h10mins30sec
              </td>
            </tr>
            <tr>
              <td className="auction-history-auctioner">Monsieur BLABLA 5 </td>
              <td className="auction-history-price">525 Tokens</td>
              <td className="auction-history-date">
                Heure de l&apos;enchère : 01/01/2023 à 1h00mins30sec
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SingleProduct;
