import axios from '../api/axios';

function useRefreshToken() {
  const refresh = async () => {
    const response = await axios.post('/api/refresh-token');
    console.log(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
