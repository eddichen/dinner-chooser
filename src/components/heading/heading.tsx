import styled, { css } from 'styled-components';

const baseHeaderStyles = css`
  
`;

const H1 = styled.h1`
  font-size: ${props => props.theme.fontSize.xxl};
  ${baseHeaderStyles};
`;

const H2 = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  ${baseHeaderStyles};
`;

export const Heading = {
  H1,
  H2
};
