import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dayjs from 'dayjs';

import './Profile.scss';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { useAppSelector } from '../../hooks/redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface UserProps {
  nom: string;
  prenom: string;
  adresse_mail: string;
  adresse: string;
}

interface UserArticles {
  id: number;
  nom: string;
  montant: number;
  date_de_fin: string;
}

interface UserAuctions {
  id: number;
  nom: string;
  date: string;
  mon_enchere: number;
  enchere_actuelle: number;
}

interface UserWonAuctions {
  id: number;
  nom: string;
  montant: string;
}

function Profile() {
  const privateAxios = useAxiosPrivate();
  const userId = useAppSelector((state) => state.user.id);

  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserProps>({
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
  });
  const [userArticles, setUserArticles] = useState<UserArticles[]>([]);
  const [userAuctions, setUserAuctions] = useState<UserAuctions[]>([]);
  const [userWonAuctions, setUserWonAuctions] = useState<UserWonAuctions[]>([]);

  useEffect(() => {
    async function fetchUserbyId() {
      try {
        const response = await privateAxios.get(`/api/profile/${userId}`);
        setUserInfo(response.data.profile);
        setUserArticles(response.data.histSell);
        setUserAuctions(response.data.histBuy);
        setUserWonAuctions(response.data.wonAuction);
      } catch (error) {
        console.error('Veuillez vous connecter', error);
      }
    }
    fetchUserbyId();
  }, [privateAxios, userId]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: event.target.value,
    }));
  }

  async function handleSaveButton() {
    try {
      const response = await axiosPrivate.patch(
        `/api/profile/${userId}/update`,
        userInfo
      );
      console.log(response);
    } catch (error) {
      console.error('Veuillez vous reconnecter', error);
    }
    setIsEditing(false);
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await privateAxios.delete(
        `/api/profile/${userId}/delete`
      );
      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Veuillez vous reconnecter', error);
    }
    setOpenModal(false);
  }

  return (
    <>
      <div id="wrapper">
        <h2 className="user-title">
          Mes informations
          <div className="icons-user">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="icon-update"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={handleEdit}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="icon-delete"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>
        </h2>
        <section className="user">
          <div className="user-label">
            <span>Nom :</span>
            <span>Prénom :</span>
            <span>Email :</span>
            <span>Adresse :</span>
          </div>

          <div className="user-infos">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={userInfo.nom}
                  onChange={(e) => handleInputChange(e, 'nom')}
                />
                <input
                  type="text"
                  value={userInfo.prenom}
                  onChange={(e) => handleInputChange(e, 'prenom')}
                />
                <input
                  type="text"
                  value={userInfo.adresse_mail}
                  onChange={(e) => handleInputChange(e, 'adresse_mail')}
                />
                <input
                  type="text"
                  value={userInfo.adresse}
                  onChange={(e) => handleInputChange(e, 'adresse')}
                />
                <button type="button" onClick={handleSaveButton}>
                  Enregistrer
                </button>
              </>
            ) : (
              <>
                <span>{userInfo.nom}</span>
                <span>{userInfo.prenom}</span>
                <span>{userInfo.adresse_mail}</span>
                <span>{userInfo.adresse}</span>
              </>
            )}
          </div>
        </section>

        <section className="my-articles">
          <h2 className="section-title">Mes articles</h2>
          {userArticles.length === 0 ? (
            <p className="empty-table">
              Tu n&apos;as pas encore d&apos;objet en vente.
            </p>
          ) : (
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
          )}
        </section>

        <section className="my-auctions">
          <h2 className="section-title">Mes enchères en cours</h2>
          {userAuctions.length === 0 ? (
            <p className="empty-table">Pas de coup de cœur ?</p>
          ) : (
            <table className="my-auctions-list">
              <thead>
                <tr>
                  <th>Nom de l&apos;article</th>
                  <th>Mise actuelle</th>
                  <th>Ma mise</th>
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
                          {userAuction.nom}
                        </Link>
                      </td>
                      <td>{userAuction.enchere_actuelle}€</td>
                      <td>{userAuction.mon_enchere}€</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        <section className="auctions_won">
          <h2 className="section-title">Mes enchères remportées</h2>
          {userWonAuctions.length === 0 ? (
            <p className="empty-table">Ça arrivera très prochainement 😉</p>
          ) : (
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
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {openModal && (
        <>
          <div
            className={
              openModal
                ? 'entire-shadow-screen is-active'
                : 'entire-shadow-screen'
            }
            onClick={() => {
              setOpenModal(false);
            }}
            role="button"
            aria-label="confirm-delete-user"
            aria-hidden="true"
          />
          <div
            className={openModal ? 'modal-delete is-active' : 'modal-delete'}
          >
            <form method="post" onSubmit={handleDelete}>
              <h2 className="user-delete-title">
                Êtes-vous sûr.e de vouloir supprimer votre compte ?
              </h2>
              <h3 className="user-delete-action">
                ⚠️ Cette action est irréversible. ⚠️
              </h3>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Non
                </button>
                <button type="submit" className="modal-confirm-btn">
                  Oui
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
