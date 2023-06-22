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
              image={item.image}
              description={item.description}
              title={item.titre}
              price={item.prix}
              endTime={item.dateFin}
            />
          ))}
      </div>
    </div>
  );
}

export default Cards;
