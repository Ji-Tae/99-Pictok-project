import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { emailPost, signupPost } from '../api/user';

export const Modal = ({ open, onClose, cancelButton, children }) => {
  if (!open) return null;
  return (
    <>
      <Overlay />
      <ModalContainer>
        <div className='modal-content'>
          {children}
          {cancelButton && <CloseButton onClick={onClose}>닫기</CloseButton>}
        </div>
      </ModalContainer>
    </>
  );
};

export const SignupModal = ({ open, onClose, onSwitch }) => {
  const [nickname, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [authcode, setAuthCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signupMutation = useMutation(signupPost, {
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      if (error.response) {
        setErrorMessage(error.response.data.errorMessage);
      }
    },
  });

  const authcodeMution = useMutation();

  const handleEmailSubmit = () => authcodeMution.mutate(emailPost({ email }));

  const sighupSubmit = () => signupMutation.mutate(signupPost({ nickname, password, confirm, authcode, email }));

  const handleSignupSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal open={open} onClose={onClose} cancelButton>
      <h1>PIC TOK</h1>
      <ModalTitle>회원가입</ModalTitle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <form onSubmit={handleSignupSubmit}>
        <InputLabel htmlFor='email'>이메일</InputLabel>
        <ModalInput type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <VerificationButton onClick={handleEmailSubmit}>인증 코드 요청</VerificationButton>
        <InputLabel htmlFor='authcode'>인증 코드</InputLabel>
        <ModalInput type='text' id='authcode' value={authcode} onChange={(e) => setAuthCode(e.target.value)} />
        <InputLabel htmlFor='username'>아이디</InputLabel>
        <ModalInput type='text' id='username' value={nickname} onChange={(e) => setUsername(e.target.value)} />
        <InputLabel htmlFor='password'>비밀번호</InputLabel>
        <ModalInput type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputLabel htmlFor='confirm'>비밀번호 확인</InputLabel>
        <ModalInput type='password' id='confirm' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <SignupButton onClick={sighupSubmit}>회원가입</SignupButton>
      </form>
      <SwitchContainer>
        <span>회원이신가요? </span>
        <SwitchButton onClick={onSwitch}>로그인</SwitchButton>
      </SwitchContainer>
    </Modal>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

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

const VerificationButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 3px;
  margin-bottom: 10px;
  &:hover {
    background-color: #2980b9;
  }
`;

const SignupButton = styled.button`
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
