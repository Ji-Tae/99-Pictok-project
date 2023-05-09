import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const API_BASE_URL = "http://44.201.251.58:3000";

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

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

  const loginMutation = useMutation(async ({ username, password }) => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    return response.json();
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

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("업로드 실패");
    }

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/items`);
    if (!response.ok) {
      throw new Error("Fetching items failed");
    }
    return response.json();
  };

  const itemsQuery = useQuery("items", fetchItems);

  const deleteItemMutation = useMutation(async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Editing item failed");
    }

    return response.json();
  }, {
    onSuccess: () => {
      itemsQuery.refetch();
    },
    onError: (error) => {
      console.error('Error editing item:', error);
    },
  });

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
  };
};