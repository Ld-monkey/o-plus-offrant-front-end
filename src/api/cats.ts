import axios from 'axios';
import defaultCataas from '../assets/images/default_images_cataas_400x400.jpg';

const API_CAT = 'https://cataas.com';

async function getRandomIdApiCat() {
  try {
    const randomCuteCat = await axios.get(`${API_CAT}/cat?json=true`);
    return randomCuteCat?.data._id;
  } catch (err) {
    return undefined;
  }
}

async function getLinkImageProfile() {
  const idRandomCat = await getRandomIdApiCat();
  if (!idRandomCat) {
    return defaultCataas;
  }
  return `${API_CAT}/cat/${idRandomCat}?width=100&height=100`;
}

export default getLinkImageProfile;
