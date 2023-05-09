import React, { useState } from "react";
import styled from "styled-components";
import { useAppLogic } from '../components/hooks/useAppLogic';

export const Modal = ({ open, onClose, cancelButton, children }) => {
    if (!open) return null;
    return (
        <ModalContainer>
            <div className="modal-content">
                {children}
                {cancelButton && <CloseButton onClick={onClose}>닫기</CloseButton>}
            </div>
        </ModalContainer>
    );
};

export const SignupModal = ({ open, onClose, onSwitch }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    
    const { handleSignup, handleEmailVerification, errorMessage, setErrorMessage } = useAppLogic(); 

    const handleVerificationRequest = async () => {
        try {
            await handleEmailVerification(email);
        } catch (error) {
            setErrorMessage("인증 코드를 요청하는 도중 문제가 발생했습니다.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!handleEmailVerification.verify(verificationCode)) {
            setErrorMessage("인증 코드가 올바르지 않습니다.");
            return;
        }

        try {
            await handleSignup({ username, password, email });  
        } catch (error) {
            setErrorMessage("서버와의 연결이 원활하지 않습니다.");
        }
    };

    return (
        <Modal open={open} onClose={onClose} cancelButton>
            <ModalTitle>회원가입</ModalTitle>
            <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="username">아이디</InputLabel>
                <ModalInput
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputLabel htmlFor="email">이메일</InputLabel>
                <ModalInput
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <VerificationButton onClick={handleVerificationRequest}>인증 코드 요청</VerificationButton>
                <InputLabel htmlFor="verificationCode">인증 코드</InputLabel>
                <ModalInput
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <ModalInput
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputLabel htmlFor="confirmPassword">비밀번호 확인</InputLabel>
                <ModalInput
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <SignupButton type="submit">회원가입</SignupButton>
            </form>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <SwitchContainer>
                <span>회원이신가요? </span>
                <SwitchButton onClick={onSwitch}>로그인</SwitchButton>
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
  height: 600px;
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