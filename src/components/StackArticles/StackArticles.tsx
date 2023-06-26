import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import { IRandomItems } from '../../@types/articles';
import './StackArticles.scss';

function StackArticles({ articles }: { articles: IRandomItems[] }) {
  const [items, setItems] = useState<IRandomItems[] | undefined>();

  /**
   * Get two indexes randomly.
   * @param totalArticle { number } - Total number of items.
   * @returns Return an array with 2 indexes (e.g [2, 8]).
   */
  const getRandomItems = (totalArticle: number) => {
    const totalArticles = totalArticle;
    const indexArticles: number[] = [];

    while (indexArticles.length !== 2) {
      const index = Math.floor(Math.random() * totalArticles);
      if (indexArticles.length === 0) {
        indexArticles.push(index);
      } else if (indexArticles[0] !== index) {
        indexArticles.push(index);
      }
    }

    return indexArticles;
  };

  useEffect(() => {
    function buildArticle(products: IRandomItems[]): IRandomItems[] {
      // Get two random index.
      const [firstItem, secondItem] = getRandomItems(products.length);

      // Custom span top left message.
      const messageLabel = 'Dernière chance';

      // Build data.
      const itemsArticles = [
        {
          id: products[firstItem].id,
          nom: products[firstItem].nom,
          photo: `${products[firstItem].photo}`,
          description: products[firstItem].description,
          montant: products[firstItem].montant,
          date_de_fin: products[firstItem].date_de_fin,
          label: messageLabel,
        },
        {
          id: products[secondItem].id,
          nom: products[secondItem].nom,
          photo: `${products[secondItem].photo}`,
          description: products[secondItem].description,
          montant: products[secondItem].montant,
          date_de_fin: products[secondItem].date_de_fin,
          label: messageLabel,
        },
      ];

      return itemsArticles;
    }

    if (articles) {
      const result = buildArticle(articles);
      setItems(result);
    }
  }, [articles]);

  return (
    <div id="wrapper">
      <h2>Enchères</h2>
      <div className="stackArticles">{items && <Cards items={items} />}</div>
    </div>
  );
}

export default StackArticles;