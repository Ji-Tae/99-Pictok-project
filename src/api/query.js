//axios 요청이 들어가는 모든 모듈
import axios from 'axios';

//최신사진 조회
const getPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

export { getPictures };
