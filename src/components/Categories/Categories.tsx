import './Categories.scss';

function Categories() {
  return(
    <div id="wrapper">
      <nav className="categories-navbar">
        <a href='#' className="categories-link">
          Sport & Loisirs
        </a>
        <a href='#' className="categories-link">
          Maison & Jardin
        </a>
        <a href='#' className="categories-link">
          High Tech
        </a>
        <a href='#' className="categories-link">
          Mode
        </a>
        <a href='#' className="categories-link">
          Livres
        </a>
      </nav>
    </div>
  )
}

export default Categories;
