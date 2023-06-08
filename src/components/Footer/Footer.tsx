import './Footer.scss';

function handleClickFooter(){
  // Quand on clique on est redirigé vers la page correspondante
}

function Footer() {
  return (
 <div className="Footer">
  <div className="Footer__info">
  <h2>  O + Offrant</h2> 
  <span onClick={handleClickFooter}>Inscription</span> 
  <span onClick={handleClickFooter}>Connectez-vous</span>
  <span onClick={handleClickFooter}>Vendre</span>
  <span onClick={handleClickFooter}>Catégories</span>
  </div>
  <div className="Footer__Pseudo">
  <h2 onClick={handleClickFooter}>Contactez-nous</h2>
  <span onClick={handleClickFooter}>Pseudo 1</span>
  <span onClick={handleClickFooter}>Pseudo 2</span>
  <span onClick={handleClickFooter}>Pseudo 3</span>
  <span onClick={handleClickFooter}>Pseudo 4</span>
  <span onClick={handleClickFooter}>Pseudo 5</span>
  </div>
  </div>);
}

export default Footer;
