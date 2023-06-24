import axios from './axios';

/**
 *
 * @returns
 */
async function getAllArticles() {
  try {
    const response = await axios.get('/api/articles');

    const allArticles = response?.data?.allArticles;
    const allCategories = response?.data?.allCategories;

    return { allArticles, allCategories };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

export default getAllArticles;
