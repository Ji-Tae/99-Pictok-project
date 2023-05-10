import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { loginPost } from '../api/user';

export const Modal = ({ open, onClose, cancelButton, children }) => {
  if (!open) return null;
  return (
    <ModalContainer>
      <div className='modal-content'>
        {children}
        {cancelButton && <CloseButton onClick={onClose}>닫기</CloseButton>}
      </div>
    </ModalContainer>
  );
};

export const LoginModal = ({ open, onClose, onSwitch }) => {
  const [nickname, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = useMutation(loginPost, {
    onSuccess: (data) => {
      Cookies.set('token', data.token);
      onClose();
    },
    onError: (error) => {
      if (error.response) {
        setErrorMessage(error.response.data.errorMessage);
      }
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ nickname, password });
  };

  return (
    <Modal open={open} onClose={onClose} cancelButton>
      <h1>PIC TOK</h1>
      <ModalTitle>로그인</ModalTitle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <InputLabel htmlFor='username'>아이디</InputLabel>
      <ModalInput type='text' id='username' value={nickname} onChange={(e) => setUsername(e.target.value)} />
      <InputLabel htmlFor='password'>비밀번호</InputLabel>
      <ModalInput type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <SwitchContainer>
        <span>회원이 아니십니까? </span>
        <SwitchButton onClick={onSwitch}>회원가입</SwitchButton>
      </SwitchContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  cursor: auto;
  color: black;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const LoginButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 3px;
  margin-bottom: 10px;
  &:hover {
    background-color: #2980b9;
  }
`;

const SwitchContainer = styled.div`
  font-size: 14px;
`;

const SwitchButton = styled.button`
  background-color: transparent;
  color: #3498db;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 0;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #3498db;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
