import axios from 'axios';
import Cookies from 'js-cookie';

const cookie = Cookies.get('token');
// 최신 사진 겟 요청
const getNewPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/newposts`, { withCredentials: true });
  return response.data;
};
//베스트 사진 겟 요청
const getBestPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bestposts`, { withCredentials: true });

  return response.data;
};

const uploadPost = async ({ title, content, photo }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/posts`,
    {
      title,
      content,
      photo,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie}`,
      },
    },
    { withCredentials: true },
  );
  return response.data;
};
export { getBestPictures, getNewPictures, uploadPost };
