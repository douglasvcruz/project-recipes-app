import styled from 'styled-components';

const forty = 40;

export const HeaderOn = styled.header`
  text-align: center;
  section {
    align-items: center;
    background-color: #fcdc36;
    display: flex;
    height: 52px;
  }
  button {
    background-color: #fcdc36;
    margin-right: 20px;
  }
  @media screen and ( min-width : 768px ) {
    section {
      height: 100px;
    }
  }
`;

export const Icon = styled.img`
  margin-left: 20px;
  @media screen and ( min-width : 768px ) {
    height: 90px;
    margin-left: 50px;
    width: 90px;
  }
`;

export const IconPages = styled.img`
  height: 30px;
  margin-bottom: 10px;
  margin-top: 30px;
  @media screen and ( min-width : 768px ) {
    height: 100px;
    margin-bottom: 30px;
    margin-top: 70px;
  }
`;

export const AbsoluteIcon = styled.button`
  position: absolute;
  right: ${(props) => (props.right ? `${props.right}px` : 0)};
  @media screen and ( min-width : 768px ) {
    height: 70px;
    width: 70px;
    right: ${(props) => (props.r ? `${props.r}px` : `${forty}px`)};
    img {
      width: 100%;
    }
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.105em;
  line-height: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  @media screen and ( min-width : 768px ) {
    font-size: xx-large;
    margin-bottom: 60px;
  }
`;
