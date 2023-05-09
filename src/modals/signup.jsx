import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useAppLogic } from "../components/hooks/useAppLogic";

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
    const [errorMessage, setErrorMessage] = useState("");

    const queryClient = useQueryClient();
    const { handleSignup } = useAppLogic();
    const signupMutation = useMutation(handleSignup, {
        onSuccess: () => {
            // Invalidate query cache
            queryClient.invalidateQueries("currentUser");
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 회원가입 처리
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authcode: "557685",
                },
                body: JSON.stringify({
                    nickname: username,
                    password: password,
                    confirm: confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 회원가입 성공
                setErrorMessage("");
                signupMutation.mutate();
                onClose();
                alert(data.message);
            } else {
                // 회원가입 실패
                setErrorMessage(data.errorMessage);
            }
        } catch (error) {
            // 예외 케이스
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

const ErrorMessage = styled.div `
color: red; 
font-size: 14px; 
margin-bottom: 10px;
`;