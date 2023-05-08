import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

function Search() {
  return (
    <div>
      <SearchInput placeholder='검색어를 입력해주세요' type='text' />
      <SearchOutlined />
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
`;
export default Search;
