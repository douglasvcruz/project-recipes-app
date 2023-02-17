import styled from 'styled-components';
import { Ingredients } from '../RecipeDetails/style';

export const Ingredient = styled(Ingredients)`
  list-style: none;
  li {
    margin-left: 10px;
  }
  li label {
    display: flex;
  }
  li label input {
    margin-right: 5px;
  }
`;
