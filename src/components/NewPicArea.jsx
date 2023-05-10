import React from 'react';
import PicCard from './PicCard';
import styled from 'styled-components';
import Text from './Text';
import { useQuery } from 'react-query';
import { getNewPictures } from '../api/posts';

function PicArea() {
  const { isLoading, isError, data } = useQuery('newposts', getNewPictures);
  const newPicList = data?.data;
  if (isLoading) {
    return <h3>사진 가져오는 중 입니다....</h3>;
  }

  if (isError) {
    return <h3>오류가 발생하였습니다....</h3>;
  }

  return (
    <>
      <Text fontSize={50} fontWeight={900} margin={30}>
        NEW
      </Text>
      <Text fontSize={20} fontWeight={900} color={'#6e6e6e'} margin={30}>
        새로 올라온 사진을 구경해보세요!
      </Text>
      <PicContainer>
        {newPicList?.map((card) => {
          return <PicCard key={card.id} width={308} card={card} />;
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

  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.102));
`;

export default PicArea;
