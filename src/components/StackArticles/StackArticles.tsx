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

      // Build data.
      const itemsArticles = [
        {
          id: products[firstItem].id,
          nom: products[firstItem].nom,
          photo: `${products[firstItem].photo}`,
          description: products[firstItem].description,
          montant: products[firstItem].montant,
          date_de_fin: products[firstItem].date_de_fin,
          label: 'Dernière chance',
        },
        {
          id: products[secondItem].id,
          nom: products[secondItem].nom,
          photo: `${products[secondItem].photo}`,
          description: products[secondItem].description,
          montant: products[secondItem].montant,
          date_de_fin: products[secondItem].date_de_fin,
          label: 'À ne pas manquer',
        },
      ];

      return itemsArticles;
    }

    if (articles.length > 1) {
      const result = buildArticle(articles);
      setItems(result);
    } else {
      const item = {
        id: articles[0].id,
        nom: articles[0].nom,
        photo: articles[0].photo,
        description: articles[0].description,
        montant: articles[0].montant,
        date_de_fin: articles[0].date_de_fin,
        label: 'À ne pas manquer',
      };
      setItems([item]);
    }
  }, [articles]);

  return (
    <div id="wrapper">
      <h2 className="header-stackArticles">Enchères</h2>
      <div className="stackArticles">{items && <Cards items={items} />}</div>
    </div>
  );
}

export default StackArticles;
