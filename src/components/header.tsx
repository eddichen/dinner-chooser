import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  siteTitle: string;
}

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

const Header = ({ siteTitle }: HeaderProps) => (
  <HeaderContainer>
    <HeaderInnerContainer>
      <HeaderTitle>
        <HeaderTitleLink to="/">{siteTitle}</HeaderTitleLink>
      </HeaderTitle>
    </HeaderInnerContainer>
  </HeaderContainer>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;