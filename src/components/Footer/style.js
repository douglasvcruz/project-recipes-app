import styled from 'styled-components';

export const Foooter = styled.footer`
  background-color: #41197f;
  border-top: 1px solid #333;
  bottom: 0;
  display: flex;
  height: 52px;
  justify-content: space-between;
  position: fixed;
  text-align: center;
  width: 100%;
  button {
    background-color: #41197f;
    margin: 0 40px;
  }

  @media screen and (min-width: 768px) {
    align-items: center;
    height: 85px;
    button {
      height: 60px;
      width: 60px;
    }
    img {
      width: 100%;
    }
  }
`;
