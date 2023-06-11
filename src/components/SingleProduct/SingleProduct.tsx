import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SingleProduct.scss';
import { faStar } from '@fortawesome/free-regular-svg-icons';

function SingleProduct() {
  return (
    <div id="wrapper">
      <section className="single-product">
        <div className="single-product-photo">
          <img
            src="https://www.slate.fr/sites/default/files/styles/1060x523/public/kbo-bike-6s20vsn5gsy-unsplash.jpg"
            alt="product"
          />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div>
          <h2>Titre du produit</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eos eaque laboriosam eius pariatur blanditiis vitae sed temporibus cumque ratione ducimus repellendus ex, quaerat quae consequuntur, saepe necessitatibus? Explicabo debitis ducimus quis praesentium officia necessitatibus pariatur incidunt minima libero ex cumque, in consequatur esse cum eaque sint reiciendis ad iste?</p>
          <span>Temps restant : 01:59:00</span>
          <div>
            <span>Montant actuel : 1000 Tokens</span>
            <button type="button">Enchérir</button>
          </div>
        </div>
      </section>
      <section className="auction-history">
        <header>Historique des enchères</header>
        {/* GRID ? */}
      </section>
    </div>
  );
}

export default SingleProduct;
