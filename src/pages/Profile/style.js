import styled from 'styled-components';

export const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  h4 {
    color: black;
    margin-bottom: 30px;
  }
  button {
    align-items: center;
    background-color: white;
    display: flex;
    margin-bottom: 20px;
    width: 186px;
  }
  button img {
    height: 40px;
    margin-right: 15px;
    width: 40px;
  }
`;

export const Line = styled.div`
  background-color: #797d86;
  border: 0.5px solid #b1b1b1;
  margin-bottom: 20px;
  width: 290px;
`;
