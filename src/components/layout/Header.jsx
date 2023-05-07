import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderContainer>
      <HeaderItemBox>
        <Items>PIC TOK</Items>
        <Items>
          <p>로그인</p>
          <p>회원가입</p>
          <p>검색</p>
        </Items>
      </HeaderItemBox>
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
  p {
    margin: 10px;
    cursor: pointer;
  }
`;
export default Header;
