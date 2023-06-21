import './Profil.scss';

function Profil() {
  return (
    <>
      <h2>Mon Profil</h2>
      <div>
        <h3>Historiques des enchères</h3>
        <h3>Mode de paiement</h3>
        <h3>Mes favoris</h3>
        <h3>Sécurité</h3>
      </div>
      <form method="post" className="add-article-form">
        <div className="article-name">
          <label htmlFor="titre">Nom :</label>
          <input type="text" id="titre" placeholder="Nom" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Prénom :</label>
          <input type="text" id="titre" placeholder="Prénom" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Date de Naissance :</label>
          <input type="date" id="date" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Email :</label>
          <input type="text" id="titre" placeholder="N.p@mail.Com" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Adresse de Livraison :</label>
          <input
            type="text"
            id="livraison"
            placeholder=" 365 rue arson 06300 nice"
          />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Mot de Passe Actuel :</label>
          <input type="text" id="Mot_de_Passe_Actuel" placeholder="*****" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Nouveau Mot de Passe :</label>
          <input type="text" id="Nouveau_Mot_de_Passe" placeholder="*****" />
        </div>
        <div className="article-name">
          <label htmlFor="titre">Confirmation Mot de Passe Actuel :</label>
          <input
            type="text"
            id="Confirmation_Mot_de_Passe_Actuel"
            placeholder="*****"
          />
        </div>

        <div className="form-submit-btn">
          <button type="submit" className="add-article-btn">
            Créer
          </button>
        </div>
      </form>
    </>
  );
}

export default Profil;
