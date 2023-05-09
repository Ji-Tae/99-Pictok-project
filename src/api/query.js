import axios from 'axios';

const signupPost = async ({ username, password, confirmPassword }) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, { username, password, confirmPassword });
};

const loginPost = async ({ username, password }) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { username, password });
};
 
//최신사진 조회
const getNewPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/newposts`, { withCredentials: true });
  return response.data;
};
const getBestPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bestposts`, { withCredentials: true });

  return response.data;
};
export { getNewPictures, getBestPictures, signupPost, loginPost };