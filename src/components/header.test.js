import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../theme';
import { PureHeader as Header } from './header';

describe('Header', () => {
  it('renders the header correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'Dinner Chooser'
        }
      }
    };

    render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header data={data} />
      </ThemeProvider>
    );
  });
});
