import { useState } from 'react';
import Cookies from 'js-cookie';

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

  const handleLogout = () => {
    Cookies.remove('token');
  };

  return {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
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
