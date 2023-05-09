import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { LoginModal } from '../../modals/login.jsx';
import { SignupModal } from '../../modals/signup.jsx';
import { UploadModal } from '../../modals/upload.jsx';
import UploadedItemsList from '../uploaded.jsx';

function Header() {
  const fetchItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/items`);

    if (!response.ok) {
      throw new Error('Error fetching items');
    }

    return response.json();
  };

  const { data: items, isLoading, isError, error } = useQuery('items', fetchItems);

  const loginMutation = useMutation(async ({ username, password }) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    return response.json();
  }, {
    onSuccess: () => {
      alert('로그인 성공');
      setLoginModalOpen(false);
    },
    onError: (error) => {
      console.error('Error during login:', error);
      alert('로그인 실패');
    },
  });

  const handleLoginClick = (username, password) => {
    loginMutation.mutate({ username, password });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

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
        onDelete={handleDelete}
        onEdit={handleEdit}
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