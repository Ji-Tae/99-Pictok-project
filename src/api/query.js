import axios from 'axios';

const getNewPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/newposts`);
  return response.data;
};

const signupPost = async ({ username, password, confirmPassword }) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, { username, password, confirmPassword });
};

const loginPost = async ({ username, password }) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { username, password });
};

export { getNewPictures, signupPost, loginPost }