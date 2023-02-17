import styled from 'styled-components';

export const Order = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and ( min-width : 768px ) {
    justify-content: center;
    margin-top: 30px;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 20px;
  text-align: start;
  width: 318px;
  h4 {
    color: #1a1b1c;
    font-size: 12px;
    font-weight: 700;
    line-height: 12px;
    margin-bottom: 5px;
    margin-left: 20px;
    margin-top: 15px;
  }
  @media screen and ( min-width : 768px ) {
    margin: 0 20px;
    margin-bottom: 30px;
    width: 450px;
    h4 {
      font-size: large;
      margin-bottom: 15px;
    }
  }
`;

export const ButtonImg = styled.button`
  border-radius: 5px 0 0 5px;
  height: 134.85px;
  overflow: hidden;
  width: 163.35px;
  @media screen and ( min-width : 768px ) {
    height: 190px;
    width: 230px;
  }
`;

const P = styled.p`
  font-size: 9px;
  font-weight: 400;
  line-height: 9px;
  @media screen and ( min-width : 768px ) {
    font-size: medium;
  }
`;

export const Nationality = styled(P)`
  color: #797d86;
  margin-bottom: 22px;
  margin-left: 20px;
  text-align: start;
`;

export const Done = styled(P)`
  color: #1a1b1c;
  margin-left: 20px;
  @media screen and ( min-width : 768px ) {
    margin-bottom: 20px;
    margin-top: 40px;
  }
`;

export const Tags = styled(P)`
  display: flex;
  margin-left: 20px;
  p {
    background: #d9d9d9;
    border-radius: 10px;
    color: #797d86;
    display: flex;
    margin-right: 5px;
    margin-top: 30px;
    padding: 4px;
    text-transform: lowercase;
  }
`;

export const ContainerDone = styled.div`
  align-items: flex-start;
  border: 0.1px solid #b1b1b1;
  border-left: 0;
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  @media screen and ( min-width : 768px ) {
    width: 218px;
  }
`;

export const Icon = styled.button`
  padding-top: 11px;
`;
