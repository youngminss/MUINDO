import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import TopComment from '../../components/AnalysisClothes/topComment';
import ResultListBox from '../../components/AnalysisClothes/resultListBox';

function AnalysisClothesResult() {
  const history = useHistory();
  const imgSrc = useSelector((state) => state.analysisClothes.imgSrc);
  return (
    <Container>
      <TopComment comment={'제가 분석한 결과는 다음과 같습니다.'} />

      <ImageContainer>
        <ImageBox>
          <img src={imgSrc} alt={`${imgSrc}`} />
        </ImageBox>
        <ListBox>
          <ResultListBox />
        </ListBox>
      </ImageContainer>
      <ButtonContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LuxuryBtn onClick={() => history.push('/analysis_clothes')}>다른 룩 추리하기</LuxuryBtn>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LuxuryBtn>카카오톡 공유하기</LuxuryBtn>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default AnalysisClothesResult;

const Container = styled.div`
  padding: 2vh 2vw;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
  }
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: auto;
  border: 2px solid black;
  margin-left: 1vw;
  margin-right: 1vw;

  img {
    width: 100%;
    height: auto;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 auto;
    margin-bottom: 1vw;
    width: 250px;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  width: 380px;
  height: auto;
  border: 2px solid black;
  margin-left: 1vw;
  margin-right: 1vw;
  overflow: 'auto';

  img {
    width: 100%;
    height: auto;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 auto;
    width: 250px;
  }
`;
const LuxuryBtn = styled.button`
  display: block;
  box-sizing: border-box;
  width: 220px;
  /* width: 15vw; */
  background: transparent;
  text-transform: uppercase;
  font-weight: 500;
  font-style: normal;
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #323b48;
  /* color: rgba(223, 190, 106, 0.7); */
  border-radius: 0;
  padding: 15px 20px 15px 20px;
  transition: all 0.7s ease-out;
  background: linear-gradient(270deg, rgba(223, 190, 106, 0.8), rgba(146, 111, 52, 0.8), rgba(34, 34, 34, 0), rgba(34, 34, 34, 0));
  background-position: 1% 50%;
  background-size: 300% 300%;
  text-decoration: none;
  margin: 0.625rem;
  border: none;
  border: 1px solid #323b48;
  /* border: 1px solid rgba(223, 190, 106, 0.3); */
  :hover {
    color: #fff;
    border: 1px solid rgba(223, 190, 106, 0);
    color: $white;
    background-position: 99% 50%;
  }
`;
const ButtonContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
`;
