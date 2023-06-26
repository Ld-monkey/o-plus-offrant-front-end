/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducer/user';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';
import './Profile.scss';

interface UserProps {
  nom: string;
  prenom: string;
  adresse_mail: string;
  adresse: string;
}

interface UserArticles {
  id: number;
  nom: string;
  description: string;
  montant: number;
  date_et_heure: string;
  date_de_fin: string;
}

interface UserAuctions {
  id: number;
  nom: string;
  date_de_fin: string;
  mon_enchere: number;
  enchere_actuelle: number;
}

interface UserWonAuctions {
  id: number;
  nom: string;
  montant: string;
  date_et_heure: string;
}

function Profile() {
  const privateAxios = useAxiosPrivate();
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openDeleteArticleModal, setOpenDeleteArticleModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserProps>({
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
  });
  const [userArticles, setUserArticles] = useState<UserArticles[]>([]);
  const [userAuctions, setUserAuctions] = useState<UserAuctions[]>([]);
  const [userWonAuctions, setUserWonAuctions] = useState<UserWonAuctions[]>([]);
  const [updateArticleId, setUpdateArticleId] = useState<number | null>(null);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [successMsgUser, setSuccessMsgUser] = useState('');
  const [errorMsgUser, setErrorMsgUser] = useState('');
  const [successMsgArticle, setSuccessMsgArticle] = useState('');
  const [errorMsgArticle, setErrorMsgArticle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserbyId() {
      try {
        const response = await privateAxios.get(`/api/profile/${userId}`);
        setUserInfo(response.data.profile);
        const articles = response.data.histSell;
        const sortedUserArticles = articles.sort(
          (a: { id: number }, b: { id: number }) => a.id - b.id
        );
        setUserArticles(sortedUserArticles);
        setUserAuctions(response.data.histBuy);
        const auctionsWon = response.data.wonAuction;
        const filteredWonAuctions = auctionsWon.filter(
          (auctions) => auctions.prix_de_depart !== auctions.montant
        );
        setUserWonAuctions(filteredWonAuctions);
      } catch (error) {
        console.error('Veuillez vous connecter', error);
      }
    }
    fetchUserbyId();
  }, [privateAxios, userId]);

  function handleEditUser() {
    setIsEditingUser(true);
  }

  function handleCancelEditUser() {
    setIsEditingUser(false);
  }

  function handleUserInputChange(
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
      const response = await privateAxios.patch(
        `/api/profile/${userId}/update`,
        {
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          adresse: userInfo.adresse,
          adresse_mail: userInfo.adresse_mail,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSuccessMsgUser('Votre modification a bien été prise en compte.');
      }
    } catch (error) {
      console.error('Veuillez vous reconnecter', error);
      setErrorMsgUser('Oups, veuillez réessayer.');
    }
    setIsEditingUser(false);
  }

  async function handleDeleteUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.delete(`/api/profile/${userId}/delete`);
      if (response.status === 200) {
        dispatch(logout());
        navigate('/');
      }
    } catch (error) {
      console.error('Veuillez vous reconnecter', error);
      setErrorMsgUser('Oups, veuillez réessayer.');
    }
    setOpenDeleteUserModal(false);
  }

  const notExpiredAuction = userAuctions.filter((userAuction) => {
    const isAuctionExpired = dayjs().isAfter(userAuction.date_de_fin);
    return !isAuctionExpired;
  });

  /**
   * Retrieve the ID of the article we're currently editing
   * @param id
   */
  function handleEditArticle(id: number) {
    setUpdateArticleId(id);
    setIsEditingArticle(true);
  }

  function handleArticleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserArticles((prevState) =>
      prevState.map((article) =>
        article.id === updateArticleId ? { ...article, [name]: value } : article
      )
    );
  }

  /**
   * Send PATCH request to update Article datas
   */
  async function handleUpdateArticle() {
    const editingArticle = userArticles.find(
      (article) => article.id === updateArticleId
    );
    if (!editingArticle) {
      console.error('Aucun article à mettre à jour');
    } else {
      try {
        const response = await axios.patch(
          `/article/${updateArticleId}/update`,
          {
            nom: editingArticle.nom,
            description: editingArticle.description,
            photo: 'photo', // REMOVE FROM THE DATA SENT TO THE BACKEND AND TEST AGAIN !
            utilisateur_vente_id: userId,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setSuccessMsgArticle(
            'Votre modification a bien été prise en compte.'
          );
        }
      } catch (error) {
        console.error('Veuillez vous reconnecter', error);
        setErrorMsgArticle('Oups, veuillez réessayer.');
      }
    }
    setIsEditingArticle(false);
  }

  function handleCancelEditArticle() {
    setIsEditingArticle(false);
  }

  async function handleDeleteArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.delete(`/article/${updateArticleId}/delete`);
      if (response.status === 200) {
        setSuccessMsgArticle("L'article a bien été supprimé.");
      }
    } catch (error) {
      console.log('Veuillez vous reconnecter', error);
      setErrorMsgArticle('Oups, veuillez réessayer.');
    }
    setOpenDeleteArticleModal(false);
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
              onClick={handleEditUser}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="icon-delete"
              onClick={() => {
                setOpenDeleteUserModal(true);
              }}
            />
          </div>
        </h2>
        {successMsgUser && <div className="success-msg">{successMsgUser}</div>}
        {errorMsgUser && <div className="error-msg">{errorMsgUser}</div>}
        <section className="user">
          <div className="user-label">
            <span>Nom :</span>
            <span>Prénom :</span>
            <span>Email :</span>
            <span>Adresse :</span>
          </div>

          <div className="user-infos">
            {isEditingUser ? (
              <>
                <input
                  type="text"
                  value={userInfo.nom}
                  onChange={(e) => handleUserInputChange(e, 'nom')}
                />
                <input
                  type="text"
                  value={userInfo.prenom}
                  onChange={(e) => handleUserInputChange(e, 'prenom')}
                />
                <input
                  type="text"
                  value={userInfo.adresse_mail}
                  onChange={(e) => handleUserInputChange(e, 'adresse_mail')}
                />
                <input
                  type="text"
                  value={userInfo.adresse}
                  onChange={(e) => handleUserInputChange(e, 'adresse')}
                />
                <div className="edit-btn">
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={handleCancelEditUser}
                  >
                    Annuler
                  </button>
                  <button type="button" onClick={handleSaveButton}>
                    Enregistrer
                  </button>
                </div>
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
          {successMsgArticle && (
            <div className="success-msg">{successMsgArticle}</div>
          )}
          {errorMsgArticle && (
            <div className="error-msg">{errorMsgArticle}</div>
          )}
          {userArticles.length === 0 ? (
            <p className="empty-table">
              Tu n&apos;as pas encore d&apos;objet en vente.
            </p>
          ) : (
            <table className="my-articles-list">
              <thead>
                <tr>
                  <th>Nom de l&apos;article</th>
                  <th>Description</th>
                  <th>Mise actuelle</th>
                  <th>Date de fin de vente</th>
                </tr>
              </thead>
              <tbody>
                {userArticles.map((userArticle) => {
                  const isExpired = dayjs().isAfter(userArticle.date_de_fin);
                  const formattedDate = dayjs(userArticle.date_de_fin).format(
                    'DD-MM-YYYY [à] HH:mm'
                  );
                  if (updateArticleId === userArticle.id && isEditingArticle) {
                    return (
                      <tr
                        key={`${userArticle.id}.${userArticle.date_et_heure}`}
                      >
                        <td>
                          <input
                            type="text"
                            name="nom"
                            onChange={handleArticleInput}
                            value={userArticle.nom}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="description"
                            onChange={handleArticleInput}
                            value={userArticle.description}
                          />
                        </td>
                        <td>
                          <span>{userArticle.montant}€</span>
                        </td>
                        <td>
                          <span>{formattedDate}</span>
                        </td>
                        <td className="icons-column">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="icon-confirm"
                            onClick={handleUpdateArticle}
                          />
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="icon-cancel"
                            onClick={handleCancelEditArticle}
                          />
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={`${userArticle.id}.${userArticle.date_et_heure}`}>
                      <td>
                        <Link to={`/article/${userArticle.id}`}>
                          {userArticle.nom}
                        </Link>
                      </td>
                      <td>{userArticle.description}</td>
                      <td>
                        <span>{userArticle.montant}€</span>
                      </td>
                      <td>
                        {isExpired ? (
                          <span>Expiré</span>
                        ) : (
                          <span>{formattedDate}</span>
                        )}
                      </td>
                      <td className="icons-column">
                        {isExpired ? (
                          <>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="icon-update"
                              onClick={() => handleEditArticle(userArticle.id)}
                            />
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="icon-delete"
                              onClick={() => {
                                setOpenDeleteArticleModal(true);
                              }}
                            />
                          </>
                        ) : (
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="icon-update"
                            onClick={() => handleEditArticle(userArticle.id)}
                          />
                        )}
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
          {notExpiredAuction.length === 0 ? (
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
                {notExpiredAuction.map((userAuction) => {
                  const isExpired = dayjs().isAfter(userAuction.date_de_fin);
                  const formattedDate = dayjs(userAuction.date_de_fin).format(
                    'DD-MM-YYYY [à] HH:mm'
                  );
                  return (
                    <tr key={`${userAuction.id}.${userAuction.mon_enchere}`}>
                      <td>
                        <Link to={`/article/${userAuction.id}`}>
                          {userAuction.nom}
                        </Link>
                      </td>
                      <td>{userAuction.enchere_actuelle}€</td>
                      <td>{userAuction.mon_enchere}€</td>
                      <td>
                        {isExpired ? (
                          <span>Expiré</span>
                        ) : (
                          <span>{formattedDate}</span>
                        )}
                      </td>
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
                  <tr
                    key={`${userWonAuction.id}.${userWonAuction.date_et_heure}`}
                  >
                    <td>
                      <Link to={`/article/${userWonAuction.id}`}>
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

      {/* Modal for deleting USER */}
      {openDeleteUserModal && (
        <>
          <div
            className={
              openDeleteUserModal
                ? 'entire-shadow-screen is-active'
                : 'entire-shadow-screen'
            }
            onClick={() => {
              setOpenDeleteUserModal(false);
            }}
            role="button"
            aria-label="confirm-delete-user"
            aria-hidden="true"
          />
          <div
            className={
              openDeleteUserModal ? 'modal-delete is-active' : 'modal-delete'
            }
          >
            {!userArticles.length && !notExpiredAuction.length ? (
              <form method="delete" onSubmit={handleDeleteUser}>
                <h2 className="delete-title">
                  Êtes-vous sûr.e de vouloir supprimer votre compte ?
                </h2>
                <span className="delete-action">
                  ⚠️ Cette action est irréversible. ⚠️
                </span>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => {
                      setOpenDeleteUserModal(false);
                    }}
                  >
                    Non
                  </button>
                  <button type="submit" className="modal-confirm-btn">
                    Oui
                  </button>
                </div>
              </form>
            ) : (
              <form method="delete" onSubmit={handleDeleteUser}>
                <h2 className="delete-title">
                  Êtes-vous sûr.e de vouloir supprimer votre compte ?
                </h2>
                {userArticles.length || userAuctions.length ? (
                  <>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {userArticles.length && userAuctions.length ? (
                      <span className="error-message">
                        Vous avez encore des articles et des enchères en cours.
                      </span>
                    ) : userArticles.length ? (
                      <span className="error-message">
                        Vous avez encore des articles en vente.
                      </span>
                    ) : (
                      notExpiredAuction.length && (
                        <span className="error-message">
                          Vous avez encore des enchères en cours.
                        </span>
                      )
                    )}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={() => {
                          setOpenDeleteUserModal(false);
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="delete-action">
                      ⚠️ Cette action est irréversible. ⚠️
                    </span>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={() => {
                          setOpenDeleteUserModal(false);
                        }}
                      >
                        Non
                      </button>
                      <button type="submit" className="modal-confirm-btn">
                        Oui
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </>
      )}
      {/* Modal for deleting ARTICLE */}
      {openDeleteArticleModal && (
        <>
          <div
            className={
              openDeleteArticleModal
                ? 'entire-shadow-screen is-active'
                : 'entire-shadow-screen'
            }
            onClick={() => {
              setOpenDeleteArticleModal(false);
            }}
            role="button"
            aria-label="confirm-delete-article"
            aria-hidden="true"
          />
          <div
            className={
              openDeleteArticleModal ? 'modal-delete is-active' : 'modal-delete'
            }
          >
            <form method="delete" onSubmit={handleDeleteArticle}>
              <h2 className="delete-title">
                Êtes-vous sûr.e de vouloir supprimer cet article ?
              </h2>
              <span className="delete-action">
                ⚠️ Cette action est irréversible. ⚠️
              </span>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => {
                    setOpenDeleteArticleModal(false);
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
