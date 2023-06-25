import axios from 'axios';

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
    return undefined;
  }
  return `${API_CAT}/cat/${idRandomCat}?width=100&height=100`;
}

export default getLinkImageProfile;
