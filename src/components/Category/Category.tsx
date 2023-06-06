import './Category.scss';

function Category() {
  return (
    <>
  <div className="Category">
  <p className="Tri">Trier par : 
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  <input className="input" type="checkbox"/>
  <label >Catégorie</label>
  </p>
  </div>

  <div className='containerCardCat'>
  <div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div><div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div><div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p className="liveAuction" >Prix Enchère Actuelle : 50,00 € <button>Surenchérir !</button></p>
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