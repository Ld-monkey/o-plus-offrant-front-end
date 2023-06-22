import { IRandomItems } from '../../@types/articles';
import Card from './Card';
import './Cards.scss';

function Cards({ items }: { items: IRandomItems[] }) {
  return (
    <div className="cards">
      <div className="cards-root">
        {items.length &&
          items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              photo={item.photo}
              description={item.description}
              nom={item.nom}
              montant={item.montant}
              date_de_fin={item.date_de_fin}
              label={item.label}
            />
          ))}
      </div>
    </div>
  );
}

export default Cards;
