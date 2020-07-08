import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: black;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HeaderInnerContainer = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.siteWidth};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
`;

const HeaderTitle = styled.h1`
  margin: 0;
`;

const HeaderTitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

interface HeaderProps {
  siteTitle: string;
}

const Header = ({ siteTitle }: HeaderProps) => (
  <HeaderContainer>
    <HeaderInnerContainer>
      <HeaderTitle>
        <HeaderTitleLink to="/">{siteTitle}</HeaderTitleLink>
      </HeaderTitle>
    </HeaderInnerContainer>
  </HeaderContainer>
);

export default Header;
