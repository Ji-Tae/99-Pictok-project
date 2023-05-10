import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token');
// 최신 사진 겟 요청
const getNewPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/newposts`, { withCredentials: true });
  return response.data;
};
//베스트 사진 겟 요청
const getBestPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/bestposts`, { withCredentials: true });
  console.log(response);
  return response.data;
};

const uploadPost = async (formData) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export { getBestPictures, getNewPictures, uploadPost };
