/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header';
import { theme, GlobalStyle } from '../theme';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.siteWidth};
  padding: 0 ${props => props.theme.spacing.lg};
`;

interface Props {
  children?: any;
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
