import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
button {
  background: white;
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  margin-bottom: 10px;
  overflow: hidden;
  width: 163.35px;
}
img {
  border-radius: 5px 5px 0 0;
  height: 134.85px;
}
p {
  border: 0.517px solid #b1b1b1;
  border-radius: 0 0 5px 5px;
  color: #1a1b1c;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  padding: 6px;
}
@media screen and ( min-width : 768px ) {
  margin-top: 20px;
  button {
    margin: 0 20px 30px;
    width: 450px;
  }
  img {
    height: 355.5px;
  }
  p {
    align-items: center;
    display: flex;
    font-size: x-large;
    height: 30px;
    justify-content: center;
    padding: auto;
  }
}
`;
