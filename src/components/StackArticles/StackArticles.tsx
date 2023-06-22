import Cards from '../Cards/Cards';
import { IRandomItems } from '../../@types/articles';
import './StackArticles.scss';

function StackArticles({ articles }: { articles: IRandomItems[] }) {
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

  const [firstItem, secondItem] = getRandomItems(articles.length);

  const messageLabel = 'Dernière chance';

  const itemsArticles = articles.length
    ? [
        {
          id: articles[firstItem].id,
          nom: articles[firstItem].nom,
          photo: `${articles[firstItem].photo}`,
          description: articles[firstItem].description,
          montant: articles[firstItem].montant,
          date_de_fin: articles[firstItem].date_de_fin,
          label: messageLabel,
        },
        {
          id: articles[secondItem].id,
          nom: articles[secondItem].nom,
          photo: `${articles[secondItem].photo}`,
          description: articles[secondItem].description,
          montant: articles[secondItem].montant,
          date_de_fin: articles[secondItem].date_de_fin,
          label: messageLabel,
        },
      ]
    : undefined;

  return (
    <div id="wrapper">
      <h2>Enchères</h2>
      <div className="stackArticles">
        {itemsArticles && <Cards items={itemsArticles} />}
      </div>
    </div>
  );
}

export default StackArticles;
