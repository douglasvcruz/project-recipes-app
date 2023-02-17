import styled from 'styled-components';
import { Section } from '../../components/Recipes/style';

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

export const Box = styled.div`
  background-color: white;
  border: 0.554px solid #b1b1b1;
  border-radius: 5.351px;
  color: #1a1b1c;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin: auto;
  margin-top: 10px;
  padding: 15px;
  text-align: justify;
  @media screen and ( min-width : 768px ) {
    font-size: large;
    line-height: 20px;
    width: 800px;
  }
`;

export const Ingredients = styled(Box)`
  padding: 10px;
  width: 315px;
  li {
    margin: 10px 0;
    margin-left: 20px;
  }
`;

export const SectionDetails = styled.section`
  button {
    background-color: white;
  }
`;

export const Carousel = styled.section`
  display: flex;
  margin-bottom: 60px;
  margin-left: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 350px;
  margin-top: 10px;
  @media screen and ( min-width: 768px ) {
    margin: auto;
    width: 1000px;
  }
`;

export const CarouselSection = styled(Section)`
  flex-shrink: 0;
  margin-top: 10px;
  flex-direction: column;
  margin-left: 15px;
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
