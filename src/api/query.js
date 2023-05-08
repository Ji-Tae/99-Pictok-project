//axios 요청이 들어가는 모든 모듈
import axios from 'axios';

//최신사진 조회
const getPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

const signupPost = async (username, password, confirmPassword) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {username, password, confirmPassword})
}

const loginPost = async (username, password) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {username, password})
}
export { getPictures, signupPost, loginPost };