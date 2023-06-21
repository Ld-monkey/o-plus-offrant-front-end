import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Profil.scss';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function Profile() {
  return (
    <div id="wrapper">
      <h2 className="section-title">
        Mes informations
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faTrashCan} />
      </h2>
      <section className="user-infos">
        <div className="label">
          <span>Nom :</span>
          <span>Prénom :</span>
          <span>Email :</span>
        </div>

        <div className="infos">
          <span>Estelle</span>
          <span>Zheng</span>
          <span>Estelle@email.com</span>
        </div>
      </section>

      <section className="my-articles">
        <h2 className="section-title">Mes articles</h2>
        <table className="auction-history-table">
          <thead>
            <tr>
              <td>Nom de l&apos;article</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/produit/1">Chaise</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="my-auctions">
        <h2 className="section-title">Mes enchères en cours</h2>
        <table className="auction-history-table">
          <thead>
            <tr>
              <td>Nom de l&apos;article</td>
              <td>Mise actuelle</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/produit/1">Chaise</Link>
              </td>
              <td>100€</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="auctions_won">
        <h2 className="section-title">Mes enchères remportées</h2>
        <table className="auction-history-table">
          <thead>
            <tr>
              <td>Nom de l&apos;article</td>
              <td>Mise finale</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/produit/1">Chaise</Link>
              </td>
              <td>150€</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Profile;
