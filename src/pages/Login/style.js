import styled from 'styled-components';

export const Form = styled.form`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Input = styled.input`
  border: 1px solid #41197f;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 300;
  height: 40px;
  line-height: 14px;
  margin: 5px;
  padding-left: 20px;
  width: 256px;
`;

export const Img = styled.img`
  position: absolute;
  top: 158px;
  @media screen and ( min-width : 380px ) {
    display: none;
  }
`;

export const P = styled.p`
  font-size: 20px;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.165em;
  line-height: 20px;
  margin-top: 80px;
  text-align: center;
  text-transform: uppercase;
  @media screen and ( min-width : 380px ) {
    margin-top: 50px;
  }
`;

export const Section = styled.section`
  background-color: #41197f;
  height: 346px;
    img {
      margin-top: 30px;
      width: 55%;
    }
    @media screen and ( min-width : 380px ) {
    img {
      width: 350px;
    }
  }
`;

export const Button = styled.button`
  background-color: #fcc436;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  letter-spacing: 0.03em;
  line-height: 14px;
  margin: 5px;
  text-transform: uppercase;
  width: 276px;
`;
