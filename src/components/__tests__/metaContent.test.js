import React from 'react';
import { render } from '@testing-library/react';

import MetaContent from '../metaContent/metaContent';
import useSiteMetaData from '../../hooks/use-site-metadata';
jest.mock('../../hooks/use-site-metadata');

describe('MetaContent', () => {
  const location = 'location';
  const title = 'Dinner Chooser';

  it('returns the site metadata', () => {
    useSiteMetaData.mockReturnValue({
      site: {
        title: 'Dinner Chooser',
        description: 'description',
        author: 'author',
        siteURL: 'https://dinnerchooser.com'
      }
    });
    render(<MetaContent location={location} title={title} />);
  });
});
