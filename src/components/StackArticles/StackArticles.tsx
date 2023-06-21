import Cards from '../Cards/Cards';
import './StackArticles.scss';

function StackArticles() {
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

  const items = [
    {
      id: articles[firstItem].id,
      titre: articles[firstItem].nom,
      image: `${API}${articles[firstItem].photo}`,
      alt: articles[firstItem].nom,
      description: articles[firstItem].description,
      prix: articles[firstItem].montant,
      dateFin: articles[firstItem].date_de_fin,
    },
    {
      id: articles[secondItem].id,
      titre: articles[secondItem].nom,
      image: `${API}${articles[secondItem].photo}`,
      alt: articles[secondItem].nom,
      description: articles[secondItem].description,
      prix: articles[secondItem].montant,
      dateFin: '2023-10-25T01:00:00.000Z',
    },
  ];

  return (
    <div id="wrapper">
      <h2>Enchères</h2>
      <div className="stackArticles">
        <Cards />
      </div>
    </div>
  );
}

export default StackArticles;
