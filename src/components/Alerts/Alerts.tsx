/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleExclamation,
  faCircleInfo,
  faSquareXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import './Alerts.scss';
import { IAlerts } from '../../@types/alerts';
import { useAppDispatch } from '../../hooks/redux';
import { destroyAlert } from '../../store/reducer/alerts';

const TIMEOUT = 3000; // Defaut timeout of alert.

function Alerts({ message, type = 'information', timeout = TIMEOUT }: IAlerts) {
  const [enableNotification, setEnableNotification] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setEnableNotification(false);
      dispatch(destroyAlert());
    }, timeout);
  }, [dispatch, timeout]);

  const toggleCloseInformation = () => {
    setEnableNotification(false);
  };

  let logoAlert;
  let headerAlert;

  switch (type) {
    case 'error':
      logoAlert = <FontAwesomeIcon icon={faCircleExclamation} />;
      headerAlert = 'Erreur';
      break;
    case 'warning':
      logoAlert = <FontAwesomeIcon icon={faTriangleExclamation} />;
      headerAlert = 'Attention';
      break;
    case 'success':
      logoAlert = <FontAwesomeIcon icon={faCheck} />;
      headerAlert = 'Succès';
      break;
    default:
      logoAlert = <FontAwesomeIcon icon={faCircleInfo} />;
      headerAlert = 'Information';
      break;
  }

  return (
    <div id="wrapper">
      {enableNotification && (
        <div
          className={
            type === 'information' ? 'notification' : `notification ${type}`
          }
        >
          <span className="notification-logo">{logoAlert}</span>
          <div>
            <h3>{headerAlert}</h3>
            {message && <p>{message}</p>}
          </div>
          <span className="close-notification">
            <FontAwesomeIcon
              icon={faSquareXmark}
              className="close-alert"
              onClick={toggleCloseInformation}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default Alerts;
