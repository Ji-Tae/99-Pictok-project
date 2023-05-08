//axios 요청이 들어가는 모든 모듈
import axios from 'axios';

//최신사진 조회
const getNewPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/newposts`);
  return response.data;
};
const getBestPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bestposts`);
  return response.data;
};

export { getNewPictures, getBestPictures };
