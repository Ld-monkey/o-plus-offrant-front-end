import './Category.scss';

function handleCat() {
  // Quand cliqué il faut filter pour garder uniquement les articles de cette catégorie
}

function handlePriceMore() {
  // Quand cliqué il faut faire apparaitre une pop-up être vous sûr de surenchérir à "Montant+5%"
  // modale/pop up : Confirmez vous votre enchère à Montant+5% ? OUI / ANNULER
}

function Category() {
  return (
    <>
      <div className="Category">
        <p className="Tri">
          Trier par :
          <input className="inputCat" type="checkbox" onClick={handleCat} />
          <label htmlFor="Prix croissant" className="categoryName">
            Prix croissant
          </label>
          <input className="inputCat" type="checkbox" onClick={handleCat} />
          <label htmlFor="Prix décroissant" className="categoryName">
            Prix décroissant
          </label>
          <input className="inputCat" type="checkbox" onClick={handleCat} />
          <label htmlFor="Temps restant croissant" className="categoryName">
            Temps restant croissant
          </label>
          <input className="inputCat" type="checkbox" onClick={handleCat} />
          <label htmlFor="Temps restant décroissant" className="categoryName">
            Temps restant décroissant
          </label>
        </p>
      </div>

      <div className="containerCardCat">
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
        <div className="cardCat">
          <img
            className="pictureItem"
            src="../../public/DualSense-Edge-Main.webp"
            alt=""
          />
          <p className="descriptItem">Descriptif de l&apos;objet</p>
          <p className="priceItem">Prix initial : 30,00 €</p>

          <div className="liveAuction">
            <p className="timerAuction">Temps restant : 1:30:35</p>
            <p className="liveAuction__proceNow">
              Prix enchère actuelle : 50,00 €
              <button
                type="button"
                className="liveAuction-button"
                onClick={handlePriceMore}
              >
                Surenchérir !
              </button>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <button type="button" className="buttonPage">
            Page précédente
          </button>
          <button type="button" className="buttonPage">
            Page suivante
          </button>
        </div>
      </div>
    </>
  );
}

export default Category;
