import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './Notifications.scss';

interface IPropsNotifications {
  message: string;
}

const TIMEOUT = 2000;

function Notifications({ message }: IPropsNotifications) {
  const [enableNotification, setEnableNotification] = useState<boolean>(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEnableNotification(false);
  //   }, TIMEOUT);
  // });

  const toggleCloseInformation = () => {
    setEnableNotification(false);
  };

  return (
    <div id="wrapper">
      {enableNotification && (
        <div className="notification">
          <h3>Information</h3>
          <p>{message}</p>
          <span className="close-notification">
            <FontAwesomeIcon
              icon={faSquareXmark}
              className="close-login"
              onClick={toggleCloseInformation}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default Notifications;
