import styled from 'styled-components';

const fifteen = 15;

export const CardContainer = styled.div`
  background: white;
  display: flex;
  height: 135px;
  margin: 0 20px;
  margin-bottom: 20px;
  width: 318px;
  button {
    background-color: white;
  }
  @media screen and ( min-width : 768px ) {
    height: 190px;
    margin-bottom: 30px;
    width: 450px;
  }
`;

export const Card = styled.section`
  border: 0.1px solid #b1b1b1;
  border-left: 0;
  border-radius: 0 5px 5px 0;
  text-align: start;
  width: 156px;
  h4 {
    color: #1a1b1c;
    font-size: 12px;
    font-weight: 700;
    line-height: 12px;
    margin-bottom: 5px;
    margin-left: 20px;
    margin-top: 33px;
  }
  p {
    color: #797d86;
    font-size: 9px;
    font-weight: 300;
    line-height: 9px;
    margin-bottom: 35px;
    margin-left: 20px;
    text-align: start;
  }
  @media screen and ( min-width : 768px ) {
    height: 190px;
    width: 218px;
  }
`;

export const ButtonCard = styled.button`
  border-radius: 5px 0 0 5px;
  height: 134.85px;
  overflow: hidden;
  width: 163.35px;
  img {
    width: 100%;
  }
  @media screen and ( min-width : 768px ) {
    height: 190px;
    width: 210px;
  }
`;

export const Icon = styled.button`
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : `${fifteen}px`)};  
`;
