import React, { useState } from "react";

export const Modal = ({ open, onClose, cancelButton, children }) => {
    if (!open) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                {cancelButton && (
                    <button className="close" onClick={onClose}>
                        &times;
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export const SignupModal = ({ open, onClose, onSignup, onSwitch }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        // 회원가입 처리
        onSignup(username, password);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} cancelButton>
            <h2>회원가입</h2>
            <label htmlFor="username">아이디</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>회원가입</button>
            <div>
                <span>회원이신가요? </span>
                <button onClick={onSwitch}>로그인</button>
            </div>
        </Modal>
    );
};
