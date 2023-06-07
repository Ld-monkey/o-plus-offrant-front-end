import './Categories.scss';

function Categories() {
  return(
    <div id="wrapper">
      <nav className="categories-navbar">
        <button type="button" className="categories-button">
          Sport & Loisirs
        </button>
        <button type="button" className="categories-button">
          Maison & Jardin
        </button>
        <button type="button" className="categories-button">
          High Tech
        </button>
        <button type="button" className="categories-button">
          Mode
        </button>
        <button type="button" className="categories-button">
          Livres
        </button>
      </nav>
    </div>
  )
}

export default Categories;
