import { ArticlesProps } from '../../@types/articles';

/**
 * Sort items based on end date time.
 * @param items - All articles.
 * @param action - 2 types of actions 'increase' or 'decrease'
 */
const handleChangeTimerSort = (
  items: ArticlesProps[],
  action: 'increase' | 'decrease'
) => {
  const now = Number(new Date());
  const sortedArticles = [...items];
  if (action === 'increase') {
    sortedArticles.sort(
      (a, b) =>
        Math.abs(Number(new Date(a.date_de_fin)) - now) -
        Math.abs(Number(new Date(b.date_de_fin)) - now)
    );
  } else {
    sortedArticles.sort(
      (a, b) =>
        Math.abs(Number(new Date(b.date_de_fin)) - now) -
        Math.abs(Number(new Date(a.date_de_fin)) - now)
    );
  }
  return sortedArticles;
};

export default handleChangeTimerSort;
