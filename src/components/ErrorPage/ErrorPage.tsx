import { Link } from 'react-router-dom';
import './ErrorPage.scss';

function ErrorPage() {
  return (
    <div>
      <div id="wrapper">
        <div className="ErrorPage">
          <Link to="/">
            <img src="https://http.cat/images/404.jpg" alt="Erreur 404" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
