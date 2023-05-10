import React from 'react';
import PicCard from './PicCard';
import styled from 'styled-components';
import Text from './Text';
import { useQuery } from 'react-query';
import { getBestPictures } from '../api/posts';

function PicArea() {
  const { isLoading, isError, data } = useQuery('bestposts', getBestPictures);
  if (isLoading) {
    return <h3>사진 가져오는 중 입니다....</h3>;
  }
  if (isError) {
    return <h3>오류가 발생하였습니다....</h3>;
  }
  return (
    <>
      <Text fontSize={50} fontWeight={900} margin={30}>
        BEST
      </Text>
      <Text fontSize={20} fontWeight={900} color={'#6e6e6e'} margin={30}>
        가장 인기 있는 사진을 구경해보세요!
      </Text>
      <PicContainer>
        {data?.map((card) => {
          return <PicCard key={card.id} width={632} card={card} />;
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
  gap: 16px;
`;
export default PicArea;
