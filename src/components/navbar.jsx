import React from "react";

const Navbar = ({
    isLoggedIn,
    onLoginClick,
    onLogout,
    onSignupClick,
    onUploadClick
}) => {
    return (
        <div>
            {!isLoggedIn ? (
                <button onClick={onLoginClick}>로그인</button>
            ) : (
                <button onClick={onLogout}>로그아웃</button>
            )}
            {!isLoggedIn && <button onClick={onSignupClick}>회원가입</button>}
            <button onClick={onUploadClick}>글쓰기</button>
        </div>
    );
};

export default Navbar;
