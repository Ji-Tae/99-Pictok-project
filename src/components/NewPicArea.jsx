import React from 'react';
import PicCard from './PicCard';
import styled from 'styled-components';
import Text from './Text';
import { useQuery } from 'react-query';
import { getPictures } from '../api/query';

function PicArea() {
  const { isLoading, isError, data } = useQuery('posts', getPictures);
  if (isLoading) {
    return <h3>사진 가져오는 중 입니다....</h3>;
  }
  if (isError) {
    return <h3>오류가 발생하였습니다....</h3>;
  }
  return (
    <>
      <Text>NEW</Text>
      <PicContainer>
        {data?.map((card) => {
          return <PicCard key={card.id} width={20} card={card} />;
        })}
      </PicContainer>
    </>
  );
}
const PicContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export default PicArea;
