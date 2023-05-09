import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderContainer>
      <HeaderItemBox>
        <Items>
          <TitleItem>PIC TOK</TitleItem>
        </Items>
        <Items>
          <p>19조</p>
          <p>FE: 박지태, 김동휘</p>
          <p>BE: 조우상, 이준교, 박준수, 김용식</p>
        </Items>
      </HeaderItemBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 30px 0px;
  background: #2563c1;
  padding-left: 300px;
  padding-right: 300px;
  margin-top: 100px;
`;
const HeaderItemBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Items = styled.div`
  display: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  p {
    font-size: 20px;
    margin: 10px;
    cursor: pointer;
  }
`;
const TitleItem = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: #fff;
`;
export default Header;
