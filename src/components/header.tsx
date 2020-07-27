import { Link } from 'gatsby';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
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

interface HeaderData {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

export const PureHeader = ({ data }: HeaderData) => (
  <HeaderContainer>
    <HeaderInnerContainer>
      <HeaderTitle>
        <HeaderTitleLink to="/">{data.site.siteMetadata.title}</HeaderTitleLink>
      </HeaderTitle>
    </HeaderInnerContainer>
  </HeaderContainer>
);

export const Header = (props: any) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return <PureHeader {...props} data={data} />
}

export default Header;
