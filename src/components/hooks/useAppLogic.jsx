import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [uploadedItems, setUploadedItems] = useState([]);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
    }

  const handleSwitch = () => {
    if (loginModalOpen) {
      setLoginModalOpen(false);
      setSignupModalOpen(true);
    } else {
      setSignupModalOpen(false);
      setLoginModalOpen(true);
    }
  };

  const handleLogin = async (nickname, password) => {
    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        nickname: nickname,
        password: password,
      });
      if(response.data.message) {
        setIsLoggedIn(true);
        setLoginModalOpen(false);
      } else if(response.data.errorMessage) {
        alert(response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignup = async (authcode, nickname, password, confirm) => {
    try {
      const response = await axios.post(`${SERVER_URL}/signup`, {
        authcode: authcode,
        nickname: nickname,
        password: password,
        confirm: confirm,
      });
      if(response.data.message) {
        setSignupModalOpen(false);
      } else if(response.data.errorMessage) {
        alert(response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleUpload = async ({ url, title, description, file }) => {
    // 업로드 처리
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }
    const API_URL = '/uploads/upload';
    const formData = new FormData();
    formData.append('url', url);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    console.log(`업로드: ${url}, ${title}, ${description}`);
    setUploadModalOpen(false);

    setUploadedItems([...uploadedItems, { url, title, description, file }]);
  };

  const handleDelete = (index) => {
    setUploadedItems(uploadedItems.filter((_, i) => i !== index));
  };

  const handleEdit = (index, updatedItem) => {
    const updatedItems = uploadedItems.map((item, i) => {
      if (i === index) {
        return updatedItem;
      }
      return item;
    });
    setUploadedItems(updatedItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/uploads/upload');
        setUploadedItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    isLoggedIn,
    uploadedItems,
    handleLoginClick,
    handleSignupClick,
    handleUploadClick,
    handleSwitch,
    handleLogin,
    handleLogout,
    handleSignup,
    handleUpload,
    handleDelete,
    handleEdit,
    setLoginModalOpen,
    setSignupModalOpen,
    setUploadModalOpen,
  };
};
