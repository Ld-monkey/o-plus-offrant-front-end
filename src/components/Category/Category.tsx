import './Category.scss';

function Category() {
  return (
    <>
  <div className="Category"></div>
  <p className="Tri">Trier par : 
  <input type="checkbox"/>
  <label >Catégorie</label>
  <input type="checkbox"/>
  <label >Catégorie</label>
  <input type="checkbox"/>
  <label >Catégorie</label>
  <input type="checkbox"/>
  <label >Catégorie</label>
  <input type="checkbox"/>
  <label >Catégorie</label>
  <input type="checkbox"/>
  <label >Catégorie</label>
  </p>

  <div className='containerCardCat'>
<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p>Prix Enchère Actuelle : 50,00€ <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p>Prix Enchère Actuelle : 50,00€ <button>Surenchérir !</button></p>
</div>

<div className='cardCat'>
<img src="../../public/DualSense-Edge-Main.webp" alt="" />
<p>Descriptif de l'objet</p>
<p>Prix Initial : 30,00 €</p>
<p>Prix Enchère Actuelle : 50,00€ <button>Surenchérir !</button></p>
</div>
</div>

  <p><button className="buttonPrevious">Page précédente</button>
  <button className="buttonNext">Page suivante</button></p>
  
  </>
  )
}

export default Category;