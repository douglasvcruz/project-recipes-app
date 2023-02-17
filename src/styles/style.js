import styled from 'styled-components';
import { Box } from '../pages/RecipeDetails/style';

export const SectionFilter = styled.section`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  button {
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 45px;
  }
  p {
    color: #797d86;
    width: 58px;
    font-family: " Segoe UI ", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 9px;
    font-weight: 300;
    line-height: 9px;
    margin-top: 5px;
    text-align: center;
  }
  img {
    height: 44px;
    width: 44px;
  }

  @media screen and (min-width: 768px) {
    button {
      height: auto;
    }
    img {
      height: 120px;
      width: 120px;
    }
    p {
      color: #797d86;
      line-height: 25px;
      width: 160px;
      font-size: x-large;
    }
  }
`;

export const Icon = styled.button`
  border-radius: 5px;
  box-shadow: 0 0 3px gray;
  cursor: pointer;
  padding: 5px;
  padding-bottom: 3px;
  position: absolute;
  top: 25px;
  right: ${(props) => (props.right ? `${props.right}px` : 0)};
`;

export const Div = styled.div`
  height: 161.85px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

export const P = styled.p`
  color: #1a1b1c;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : 0)};
  margin-top: 30px;
  text-align: start;
`;

export const Category = styled.p`
  color: #fcc436;
  font-size: 12px;
  font-weight: 700;
  left: 20px;
  line-height: 12px;
  position: absolute;
  top: 31px;
`;

export const Title = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.105em;
  line-height: 20px;
  margin: auto;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 70px;
  width: 100%;
`;

export const Video = styled.iframe`
  height: 205.09px;
  margin-top: 10px;
  width: 336px;
  @media screen and ( min-width : 768px ) {
    height: 400px;
    margin-bottom: 20px;
    width: 800px;
  }
`;

export const Instructions = styled(Box)`
  padding: 15px;
  width: 305px;
`;

export const SectionDetails = styled.section`
  button {
    background-color: white;
  }
`;

export const Button = styled.button`
  background-color: #fcc436;
  border-radius: 5px;
  bottom: 0;
  color: white;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  left: 4%;
  letter-spacing: 0.03em;
  line-height: 14px;
  margin: 15px auto;
  position: fixed;
  text-transform: uppercase;
  width: 336px;
  @media screen and ( min-width : 768px ) {
    left: 41.5%;
  }
`;
