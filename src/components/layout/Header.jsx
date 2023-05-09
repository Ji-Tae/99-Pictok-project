import React from 'react';
import styled from 'styled-components';
import { useAppLogic } from '../hooks/useAppLogic.jsx';
import { LoginModal } from '../../modals/login.jsx'
import { SignupModal } from '../../modals/signup.jsx'
import { UploadModal } from '../../modals/upload.jsx'
import UploadedItemsList from '../uploaded.jsx'

function Header() {
  const {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    itemsQuery,
    handleLoginClick,
    handleSignupClick,
    // handleUploadClick,
    handleSwitch,
    handleLogout,
    handleLogin,
    handleSignup,
    handleUpload,
    // handleDelete,
    // handleEdit,
    loginMutation,
    // signupMutation,
    // uploadMutation,
    deleteItemMutation,
    editItemMutation,
    setLoginModalOpen,
    setSignupModalOpen,
    setUploadModalOpen,
  } = useAppLogic();

  const { data: items, isLoading, isError, error } = itemsQuery;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const isLoggedIn = loginMutation.isSuccess;

  return (
    <HeaderContainer>
      <HeaderItemBox>
        <Items>PIC TOK</Items>
        <Items>
          {!isLoggedIn ? (
            <>
              <p onClick={handleLoginClick}>로그인</p>
              <p onClick={handleSignupClick}>회원가입</p>
            </>
          ) : (
            <p onClick={handleLogout}>로그아웃</p>
          )}
          <p>검색</p>
        </Items>
      </HeaderItemBox>
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
        uploadedItems={items}
        onDelete={deleteItemMutation.mutate}
        onEdit={editItemMutation.mutate}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
background: gray; 
padding: 0px 300px;
`;

const HeaderItemBox = styled.div`
display: flex; 
justify-content: space-between;
`;

const Items = styled.div`
display: flex; 
align-items: center; 
justify-content: center; 
cursor: pointer; 
p { margin: 10px; 
  cursor: pointer; }
`;
export default Header;