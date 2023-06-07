import './Category.scss';

function Category() {
  return (
    <>
  <div className="Category">
  <p className="Tri">Trier par : 
  <input className="inputCat" type="checkbox"/>
  <label >Sport & Loisirs</label>
  <input className="inputCat" type="checkbox"/>
  <label >High Tech</label>
  <input className="inputCat" type="checkbox"/>
  <label >Maison & Jardin</label>
  <input className="inputCat" type="checkbox"/>
  <label >Mode</label>
  <input className="inputCat" type="checkbox"/>
  <label >Livres</label>
  </p>
  </div>

  <div className='containerCardCat'>
  <div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div><div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div><div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>

<div className="liveAuction">
<p>Temps restant : 1:30:35</p>
<p>Prix Enchère Actuelle : 50,00 € <button className="liveAuction-button">Surenchérir !</button></p>
</div>
</div>
</div>

<div className='buttonPage'>
  <p><button className="buttonPrevious">Page précédente</button>
  <button className="buttonNext">Page suivante</button></p>
</div>
  </>
  )
}

export default Category;