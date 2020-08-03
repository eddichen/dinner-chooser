import styled, { css } from 'styled-components';

const BaseHeaderStyles = css`
  font-family: ${props => props.theme.fontFamily.serif};
`;

export const H1 = styled.h1`
  ${BaseHeaderStyles};
  font-size: ${props => props.theme.fontSize.xxxl};
`;

export const H2 = styled.h2`
  ${BaseHeaderStyles};
  font-size: ${props => props.theme.fontSize.xl};
`;
