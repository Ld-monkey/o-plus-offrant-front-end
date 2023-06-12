import './AddArticle.scss';

function AddArticle() {
  return (
    <div id="wrapper">
      <h2>Vendre votre article</h2>
      <form method="post" className="add-article-form">
        <div className="article-name">
          <label htmlFor="title">Nom :</label>
          <input type="text" placeholder="Mug O'clock jamais reçu" />
        </div>

        <div className="article-description">
          <label htmlFor="description">Description :</label>
          <textarea rows={5} placeholder="Détail de l'article..." />
        </div>

        <div className="article-price">
          <label htmlFor="price">Prix de départ :</label>
          <input type="text" />
        </div>

        <div className="article-timer">
          <label htmlFor="timer">Temps de vente :</label>
          <div className="wrapper">
            <label htmlFor="short-sale">
              <input
                type="radio"
                name="sale-period"
                value="72 Heures"
                checked
              />
              Vente sur 3 Jours
            </label>
            <label htmlFor="long-sale">
              <input type="radio" name="sale-period" value="168 Heures" />
              Vente sur 7 Jours
            </label>
          </div>
        </div>

        <div className="article-photo">
          <label htmlFor="photo">Photo :</label>
          <input type="file" accept="image/*" />
        </div>

        <div className="form-submit-btn">
          <button type="submit" className="add-article-btn">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
