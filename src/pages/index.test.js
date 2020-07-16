import React from 'react';
import { render } from '@testing-library/react';
import { StaticQuery } from 'gatsby'; // mocked

import IndexPage from './index';

beforeEach(() => {
  StaticQuery.mockImplmentationOnce(({ render }) => {
    render({
      data: {
        allContentfulRecipe: {
          nodes: []
        },
        allContentfulPhrases: {
          nodes: [
            {
              phrase: 'Hello'
            }
          ]
        }
      }
    });
  });
});
