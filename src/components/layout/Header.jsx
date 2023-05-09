import React from 'react';
import styled from 'styled-components';
import Search from '../Search';

function Header() {
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
          <p>로그인</p>
          <p>회원가입</p>
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
