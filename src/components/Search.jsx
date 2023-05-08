import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

function Search() {
  return (
    <div style={{ position: 'relative' }}>
      <SearchOutlined style={{ position: 'absolute', top: '17%', right: '5%', fontSize: '30px' }} />
      <SearchInput placeholder='검색어를 입력해주세요' type='text' />
    </div>
  );
}
const SearchInput = styled.input`
  background: none;
  border-radius: 12px;
  border-color: #fff;
  height: 40px;
  width: 338px;
  color: #fff;
  padding-left: 20px;
  ::placeholder {
    color: #fff;
    padding-left: 20px;
    font-size: 15px;
  }
`;
export default Search;
