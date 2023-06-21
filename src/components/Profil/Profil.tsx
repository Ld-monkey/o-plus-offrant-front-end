import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dayjs from 'dayjs';

import './Profil.scss';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

interface UserProps {
  nom: string;
  prenom: string;
  adresse_mail: string;
}

interface UserArticles {
  id: number;
  nom: string;
  montant: number;
  date_de_fin: string;
}

interface UserAuctions {
  id: number;
  montant: number;
  date: string;
  // nom: string; => nom du produit
}

interface UserWonAuctions {
  id: number;
  nom: string;
  montant: string;
}

function Profile() {
  const [userInfo, setUserInfo] = useState<UserProps>({
    nom: '',
    prenom: '',
    adresse_mail: '',
  });
  const [userArticles, setUserArticles] = useState<UserArticles[]>([]);
  const [userAuctions, setUserAuctions] = useState<UserAuctions[]>([]);
  const [userWonAuctions, setUserWonAuctions] = useState<UserWonAuctions[]>([]);

  const { idUser } = useParams();

  useEffect(() => {
    async function fetchUserbyId() {
      const response = await axios.get(`/api/profile/${idUser}`);
      setUserInfo(response.data.profile);
      setUserArticles(response.data.histSell);
      setUserAuctions(response.data.histBuy);
      setUserWonAuctions(response.data.wonAuction);
    }
    fetchUserbyId();
  }, [idUser]);

  return (
    <div id="wrapper">
      <h2 className="user-title">
        Mes informations
        <div className="icons-user">
          <FontAwesomeIcon icon={faPenToSquare} className="icon-update" />
          <FontAwesomeIcon icon={faTrashCan} className="icon-delete" />
        </div>
      </h2>
      <section className="user">
        <div className="user-label">
          <span>Nom :</span>
          <span>Prénom :</span>
          <span>Email :</span>
        </div>

        <div className="user-infos">
          <span>{userInfo.nom}</span>
          <span>{userInfo.prenom}</span>
          <span>{userInfo.adresse_mail}</span>
        </div>
      </section>

      <section className="my-articles">
        <h2 className="section-title">Mes articles</h2>
        <table className="my-articles-list">
          <thead>
            <tr>
              <th>Nom de l&apos;article</th>
              <th>Mise actuelle</th>
              <th>Date de fin de vente</th>
            </tr>
          </thead>
          <tbody>
            {userArticles.map((userArticle) => {
              const formattedDate = dayjs(userArticle.date_de_fin).format(
                'DD-MM-YYYY [à] HH:mm'
              );
              return (
                <tr key={userArticle.id}>
                  <td>
                    <Link to={`/produit/${userArticle.id}`}>
                      {userArticle.nom}
                    </Link>
                  </td>
                  <td>
                    <span>{userArticle.montant}€</span>
                  </td>
                  <td>
                    <span>{formattedDate}</span>
                  </td>
                  <td className="icons-column">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="icon-update"
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="icon-delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="my-auctions">
        <h2 className="section-title">Mes enchères en cours</h2>
        <table className="my-auctions-list">
          <thead>
            <tr>
              <th>Nom de l&apos;article</th>
              <th>Mise actuelle</th>
              <th>Date de fin de vente</th>
            </tr>
          </thead>
          <tbody>
            {userAuctions.map((userAuction) => {
              const formattedDate = dayjs(userAuction.date).format(
                'DD-MM-YYYY [à] HH:mm'
              );
              return (
                <tr key={userAuction.id}>
                  <td>
                    <Link to={`/produit/${userAuction.id}`}>
                      NOM DU PRODUIT
                    </Link>
                  </td>
                  <td>{userAuction.montant}€</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="auctions_won">
        <h2 className="section-title">Mes enchères remportées</h2>
        <table className="auctions-won-list">
          <thead>
            <tr>
              <th>Nom de l&apos;article</th>
              <th>Mise finale</th>
            </tr>
          </thead>
          <tbody>
            {userWonAuctions.map((userWonAuction) => (
              <tr key={userWonAuction.id}>
                <td>
                  <Link to={`/produit/${userWonAuction.id}`}>
                    {userWonAuction.nom}
                  </Link>
                </td>
                <td>{userWonAuction.montant}€</td>
              </tr>
            ))}{' '}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Profile;
