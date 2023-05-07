import React from 'react';
import { LoginModal } from './modals/login.jsx';
import { SignupModal } from './modals/signup.jsx';
import { UploadModal } from './modals/upload.jsx';
import Navbar from './components/navbar.jsx';
import { useAppLogic } from './components/hooks/useAppLogic.jsx';
import UploadedItemsList from './components/uploaded.jsx'
import './App.css';

function App() {
  const {
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
    setUploadModalOpen
  } = useAppLogic()

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onSignupClick={handleSignupClick}
        onUploadClick={handleUploadClick}
      />
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
        onSwitch={handleSwitch}
      />
      <SignupModal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSignup={handleSignup}
        onSwitch={handleSwitch}
      />
      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />
      <UploadedItemsList
        uploadedItems={uploadedItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;