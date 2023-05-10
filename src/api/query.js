import axios from 'axios';

const signupPost = async ({ authcode, nickname, password, confirm }) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
    nickname, password, confirm, authcode
  }, { withCredentials: true });
  return response.data
};

const emailPost = async ({ email }) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/authMail`, { email }, { withCredentials: true })
  return response.data
}

const loginPost = async ({ nickname, password }) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { nickname, password }, { withCredentials: true });
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
export { getNewPictures, getBestPictures, signupPost, loginPost, emailPost };