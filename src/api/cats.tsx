import axios from 'axios';

const API_CAT = 'https://cataas.com';

async function getRandomIdApiCat() {
  try {
    const randomCuteCat = await axios.get(`https://cataas.com/cat?json=true`);
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
  return `${API_CAT}/cat/${idRandomCat}?width=50&height=50`;
}

export default getLinkImageProfile;
