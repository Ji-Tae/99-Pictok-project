import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const API_BASE_URL = "http://44.201.251.58:3000";

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
    setUploadModalOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
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

  const loginMutation = useMutation(async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      throw new Error("로그인 실패");
    }
  }, {
    onSuccess: () => {
      alert("로그인 성공");
      setLoginModalOpen(false);
    },
    onError: (error) => {
      console.error("Error during login:", error);
      alert("로그인 실패");
    },
  });
  
  const signupMutation = useMutation(async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      throw new Error("회원가입 실패");
    }
  }, {
    onSuccess: () => {
      alert("회원가입 성공");
      setSignupModalOpen(false);
    },
    onError: (error) => {
      console.error("Error during signup:", error);
      alert("회원가입 실패");
    },
  });
  
  const uploadMutation = useMutation(async ({ title, description, file }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData);
  
      return response.data;
    } catch (error) {
      throw new Error("업로드 실패");
    }
  }, {
    onSuccess: (data) => {
      alert(`제목: ${data.title}, 내용: ${data.description}, 파일명: ${data.file}`);
      setUploadModalOpen(false);
    },
    onError: (error) => {
      console.error("Error during upload:", error);
    },
  });
  
  const fetchItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    if (response.status !== 200) {
      throw new Error("Fetching items failed");
    }
    return response.data;
  };

  const itemsQuery = useQuery("items", fetchItems);

  const deleteItemMutation = useMutation(async (itemId) => {
    const response = await axios.delete(`${API_BASE_URL}/posts/${itemId}`);
    if (response.status !== 200) {
      throw new Error("Deleting item failed");
    }
    return itemId;
  }, {
    onSuccess: (itemId) => {
      itemsQuery.refetch();
    },
    onError: (error) => {
      console.error('Error deleting item:', error);
    },
  });

  const editItemMutation = useMutation(async ({ itemId, updatedData }) => {
    const response = await axios.put(`${API_BASE_URL}/posts/${itemId}`, updatedData);
    if (response.status !== 200) {
      throw new Error("Editing item failed");
    }
    return response.data;
  }, {
    onSuccess: () => {
      itemsQuery.refetch();
    },
    onError: (error) => {
      console.error('Error editing item:', error);
    },
  });

  const handleLogin = (username, password) => {
    loginMutation.mutate({ username, password });
  };

  const handleSignup = (username, password) => {
    signupMutation.mutate({ username, password });
  };

  const handleUpload = (title, description, file) => {
    uploadMutation.mutate({ title, description, file });
  };

  const handleDelete = (itemId) => {
    deleteItemMutation.mutate(itemId);
  };

  const handleEdit = (itemId, updatedData) => {
    editItemMutation.mutate({ itemId, updatedData });
  };

  return {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    itemsQuery,
    handleLoginClick,
    handleSignupClick,
    handleUploadClick,
    handleSwitch,
    loginMutation,
    signupMutation,
    uploadMutation,
    deleteItemMutation,
    editItemMutation,
    setLoginModalOpen,
    setSignupModalOpen,
    setUploadModalOpen,
    handleLogin,
    handleSignup,
    handleUpload,
    handleDelete,
    handleEdit,
    logoutModalOpen,
    setLogoutModalOpen,
    handleLogoutClick,
  };
};