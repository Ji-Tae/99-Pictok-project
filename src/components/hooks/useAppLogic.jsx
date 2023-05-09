import { useState } from 'react';

export const useAppLogic = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    isLoggedIn,
    handleLoginClick,
    handleSignupClick,
    handleUploadClick,
    handleSwitch,
    handleLogout,
    setLoginModalOpen,
    setSignupModalOpen,
    setUploadModalOpen,
  };
};
