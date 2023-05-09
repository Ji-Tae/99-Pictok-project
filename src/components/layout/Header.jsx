import React from 'react';
import styled from 'styled-components';
import { LoginModal } from '../../modals/login.jsx';
import { useAppLogic } from '../hooks/useAppLogic.jsx';
import { SignupModal } from '../../modals/signup.jsx';
import { UploadModal } from '../../modals/upload.jsx';
import UploadedItemsList from '../uploaded.jsx';
import Search from '../Search';

function Header() {
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
    setUploadModalOpen,
  } = useAppLogic();
  return (
    <HeaderContainer>
      <HeaderItemBox>
        <Items>
          <TitleItem>PIC TOK</TitleItem>
        </Items>

        <Items>
          <Search />
        </Items>
        <Items>
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

          {!isLoggedIn ? <p onClick={handleLoginClick}>로그인</p> : <p onClick={handleLogout}>로그아웃</p>}
          {!isLoggedIn && <p onClick={handleSignupClick}>회원가입</p>}
          <p onClick={handleUploadClick}>글쓰기</p>
          <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} onUpload={handleUpload} />
          <UploadedItemsList uploadedItems={uploadedItems} onDelete={handleDelete} onEdit={handleEdit} />
          <p>검색</p>
        </Items>
      </HeaderItemBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 10px 0px;
  background: #2563c1;
  padding-left: 300px;
  padding-right: 300px;
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
  color: #fff;
  p {
    margin: 10px;
    cursor: pointer;
  }
`;
const TitleItem = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`;
export default Header;
