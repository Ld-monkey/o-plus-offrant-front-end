import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div id="wrapper">
        <img src="/Logo.png" className="header-logo" alt="logo"/>
        <h1 className="header-title">O+ OFFRANT</h1>
        <form>
          <input type="text" className="header-searchbar" placeholder='Votre recherche' />
        </form>
      </div>
    </header>
  )
}

export default Header;
