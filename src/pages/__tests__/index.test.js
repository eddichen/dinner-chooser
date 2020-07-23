import React from 'react';
import { render } from '@testing-library/react';

import IndexPage from '../index';
import useSiteMetaData from '../../hooks/use-site-metadata';
jest.mock('../../hooks/use-site-metadata');

describe('IndexPage', () => {
  useSiteMetaData.mockReturnValue({
    site: {
      title: 'Dinner Chooser',
      description: 'description',
      author: 'author',
      siteURL: 'https://dinnerchooser.com'
    }
  });

  it('renders the IndexPage component', () => {
    const data = {
      allContentfulPhrases: {
        nodes: [
          {
            phrase: 'Hello'
          }
        ]
      }
    };

    render(<IndexPage data={data} />);
  });
});
