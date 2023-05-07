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

export const LoginModal = ({ open, onClose, onLogin, onSwitch }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // 로그인 처리
        onLogin(username, password);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} cancelButton>
            <h2>로그인</h2>
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
            <button onClick={handleLogin}>로그인</button>
            <div>
                <span>회원이 아니십니까? </span>
                <button onClick={onSwitch}>회원가입</button>
            </div>
        </Modal>
    );
};
