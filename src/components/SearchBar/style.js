import styled from 'styled-components';

export const Input = styled.input`
  background-color: white;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  color: #797d86;
  font-size: 14px;
  font-weight: 300;
  height: 40px;
  left: 13px;
  line-height: 14px;
  margin: auto;
  padding-left: 20px;
  position: absolute;
  top: 160px;
  width: 338px;
  @media screen and ( min-width : 768px ) {
    font-size: x-large;
    height: 80px;
    left: 28.35%;
    padding-left: 30px;
    top: auto;
    width: 800px;
  }
`;

export const Section = styled.section`
  background-color: #41197f;
  border-radius: 10px;
  height: 62px;
  margin: auto;
  padding-top: 26px;
  width: 338px;
  label {
    margin: 0 10px;
  }
  span {
    color: white;
    font-size: 9px;
    font-weight: 400;
    line-height: 9px;
    padding-top: 2px;
  }
  input {
    margin-bottom: 12px;
    margin-right: 4px;
  }
  button {
    background-color: #fcc436;
    border-radius: 5px;
    color: white;
    font-size: 12px;
    font-weight: 700;
    height: 25px;
    letter-spacing: 0.03em;
    line-height: 12px;
    text-transform: uppercase;
    width: 208.16px;
  }
  @media screen and ( min-width : 768px ) {
    height: 110px;
    padding-top: 90px;
    width: 800px;
    label {
      margin: 0 32px;
    }
    span {
      font-size: 22px;
    }
    button {
      font-size: x-large;
      height: 50px;
      margin-top: 15px;
      width: 490px;
    }
  }
`;
