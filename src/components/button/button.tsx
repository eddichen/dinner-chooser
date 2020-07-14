import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.color.black};
  color: ${props => props.theme.color.white};
  border: none;
  font-family: ${props => props.theme.fontFamily.sansSerif};
  font-size: ${props => props.theme.fontSize.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`;

export default Button;
