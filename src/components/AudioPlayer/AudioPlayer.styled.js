import styled from "@emotion/styled";

export const PlayerWrapper = styled.div`
  gap: 5px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;

`;

export const PlayerSection = styled.div`
  background-color: #f19eca;
  border-radius: 20px;
  width: 104px;
  height: 30px;
  padding: 0px 10px;
  display: flex;
  position: relative;
  align-items: center;

  
  @media screen and (min-width: 834px) {
    width: 300px;
    height: 85px;
    align-items: center;
  }

  @media screen and (min-width: 1440px) {
    width: 280px;
    height: 80px;
  }
`;

export const PlayerButton = styled.button`
`;
