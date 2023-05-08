import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [uploadedItems, setUploadedItems] = useState([]);

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
    if (!isLoggedIn) {
      alert('로그인을 해주세요');
      console.log(isLoggedIn)
    } else {
      setUploadModalOpen(true);
      console.log(isLoggedIn)
    }

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

  const handleLogin = async () => {
    try {
      alert("로그인 성공");
      setIsLoggedIn(true);
      setLoginModalOpen(false);
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 실패");
    }
  };

  const handleSignup = async () => {
    try {
      alert("회원가입 성공");
      setSignupModalOpen(false);
    } catch (error) {
      console.error("Error during signup:", error);
      alert("회원가입 실패");
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpload = async ({ url, title, description, file }) => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      // 업로드 데이터를 JSON Server에 저장합니다.
      const payload = {
        url,
        title,
        description,
      };
      const response = await axios.post("/uploads", payload);

      setUploadedItems([...uploadedItems, { ...payload, id: response.data.id }]);
      setUploadModalOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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