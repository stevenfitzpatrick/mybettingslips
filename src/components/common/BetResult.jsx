import styled from 'styled-components';

import { resultToThemeMap } from '../../store/bet.constants';

const BetResult = styled.span`
  color: ${({ result, theme }) =>
    theme[resultToThemeMap[result]]
      ? theme[resultToThemeMap[result]].bg
      : '#ffffff'};
`;

export default BetResult;
