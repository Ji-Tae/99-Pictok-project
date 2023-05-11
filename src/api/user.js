import axios from 'axios';

//회원가입 포스트 요청
const signupPost = async ({ authcode, nickname, password, confirm, email }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/signup`,
    {
      nickname,
      password,
      confirm,
      authcode,
      email,
    },
    { withCredentials: true },
  );
  return response.data;
};

//이메일 인증 코드 포스트 요청
const emailPost = async ({ email }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/authMail`,
    { email },
    { withCredentials: true },
  );
  return response.data;
};

//로그인 포스트 요청
const loginPost = async ({ nickname, password }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/login`,
    { nickname, password },
    { withCredentials: true },
  );
  return response.data;
};

export { signupPost, emailPost, loginPost };
