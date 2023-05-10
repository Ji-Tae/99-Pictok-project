import React from 'react';
import styled from 'styled-components';
import { LoginModal } from '../../modals/login.jsx';
import { useAppLogic } from '../hooks/useAppLogic.jsx';
import { SignupModal } from '../../modals/signup.jsx';
import { UploadModal } from '../../modals/upload.jsx';
import Search from '../Search';

function Header() {
  const {
    loginModalOpen,
    signupModalOpen,
    uploadModalOpen,
    isLoggedIn,
    handleLoginClick,
    handleSignupClick,
    handleSwitch,
    handleLogout,
    handleUpload,
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
            onSwitch={handleSwitch}
          />

          <SignupModal
            open={signupModalOpen}
            onClose={() => setSignupModalOpen(false)}
            onSwitch={handleSwitch}
          />

          {!isLoggedIn ? <p onClick={handleLoginClick}>로그인</p> : <p onClick={handleLogout}>로그아웃</p>}
          {!isLoggedIn && <p onClick={handleSignupClick}>회원가입</p>}
          <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} onUpload={handleUpload} />
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
