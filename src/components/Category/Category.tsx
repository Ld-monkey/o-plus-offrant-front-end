import './Category.scss';

function handleCat(){
// Quand cliqué il faut filter pour garder uniquement les articles de cette catégorie
}

function handlePriceMore() {
// Quand cliqué il faut faire apparaitre une pop-up être vous sûr de surenchérir à "Montant+5%"
// modale/pop up : Confirmez vous votre enchère à Montant+5% ? OUI / ANNULER
}

function Category() {
  return (
    <>
  <div className="Category">
  <p className="Tri">Trier par : 
  <input className="inputCat" type="checkbox" onClick={handleCat}/>
  <label className='categoryName'>Sport & Loisirs</label>
  <input className="inputCat" type="checkbox" onClick={handleCat}/>
  <label className='categoryName'>High Tech</label>
  <input className="inputCat" type="checkbox" onClick={handleCat}/>
  <label className='categoryName'>Maison & Jardin</label>
  <input className="inputCat" type="checkbox" onClick={handleCat}/>
  <label className='categoryName'>Mode</label>
  <input className="inputCat" type="checkbox" onClick={handleCat}/>
  <label className='categoryName'>Livres</label>
  </p>
  </div>

  <div className='containerCardCat'>
  <div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div><div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div><div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 € <button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !</button></p>
</div>
</div>

<div className='cardCat'>
<img className='pictureItem' src="../../public/DualSense-Edge-Main.webp" alt="" />
<p className='descriptItem'>Descriptif de l'objet</p>
<p className='priceItem'>Prix initial : 30,00 €</p>

<div className="liveAuction">
<p className='timerAuction'>Temps restant : 1:30:35</p>
<p className='liveAuction__proceNow'>Prix enchère actuelle : 50,00 €
<button type="button" className="liveAuction-button" onClick={handlePriceMore} >Surenchérir !
</button>
</p>
</div>
</div>
</div>

<div className='buttonPage'>
  <div><button className="buttonPrevious">Page précédente</button>
  <button className="buttonNext">Page suivante</button></div>
</div>
</>
  )
}

export default Category;
