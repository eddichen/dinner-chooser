import styled from 'styled-components';

export const ShareList = styled.ul`
  list-style-type: none;
  font-family: ${props => props.theme.fontFamily.sansSerif};
  margin: 0;
  display: flex;
`;

export const ShareListItem = styled.li`
  margin-right: ${props => props.theme.spacing.md};
  font-weight: bold;
`;

export const ShareListLink = styled.a`
  color: ${props => props.theme.color.black};
`;

export const ShareButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

export const ShareButtonText = styled.span`
  margin-left: ${props => props.theme.spacing.sm};
`;
