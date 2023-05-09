import { useState } from 'react';
import axios from 'axios';

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // error message state 추가

  const [email, setEmail] = useState(""); // 이메일 주소 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 상태

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
    setUploadModalOpen(false);
  };

  const handleSignupClick = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
    setUploadModalOpen(false);
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleSwitch = () => {
    if (loginModalOpen) {
      setLoginModalOpen(false);
      setSignupModalOpen(true);
    } else {
      setSignupModalOpen(false);
      setLoginModalOpen(true);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post('/login', { username, password });
      // login success
      setIsLoggedIn(true);
    } catch (error) {
      // handle error
      if (error.response.status === 412) {
        setErrorMessage("닉네임 또는 패스워드를 확인해주세요.");
      } else if (error.response.status === 400) {
        setErrorMessage("로그인에 실패하였습니다.");
      } else {
        setErrorMessage("서버와의 연결이 원활하지 않습니다.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignup = async ({ username, password, confirmPassword, authcode }) => {
    try {
      const response = await axios.post('/signup', {
        authcode,
        nickname: username,
        password,
        confirm: confirmPassword,
      });

      // signup success
      setSignupModalOpen(false);
      setLoginModalOpen(true);
    } catch (error) {
      // handle error
      if (error.response.status === 412) {
        setErrorMessage("닉네임 또는 패스워드를 확인해주세요.");
      } else if (error.response.status === 400) {
        setErrorMessage("회원가입에 실패하였습니다.");
      } else {
        setErrorMessage("서버와의 연결이 원활하지 않습니다.");
      }
    }
  };

  const handleEmailVerification = async (email) => {
    try {
      await axios.post('/authMail', { email });
      // email verification success
    } catch (error) {
      // handle error
      if (error.response.status === 412) {
        setErrorMessage("이메일 주소를 확인해주세요.");
      } else if (error.response.status === 400) {
        setErrorMessage("인증 코드 발송에 실패하였습니다.");
      } else if (error.response.status === 410) {
        setErrorMessage("이메일의 형식이 일치하지 않습니다.");
      } else {
        setErrorMessage("서버와의 연결이 원활하지 않습니다.");
      }
    }
  };

  const verify = async (code) => {
    if (code !== verificationCode) {
      setErrorMessage("인증 코드가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  return {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    isLoggedIn,
    errorMessage, // error message state 반환

    email,
    setEmail,
    verificationCode,
    setVerificationCode,
    handleEmailVerification,
    verify,

    handleLoginClick,
    handleSignupClick,
    handleUploadClick,
    handleSwitch,
    handleLogin,
    handleSignup,
    handleLogout,
    setLoginModalOpen,
    setSignupModalOpen,
    setUploadModalOpen,
  };
};
