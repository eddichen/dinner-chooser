import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import RecipeCard, { RecipePreview } from '../components/recipeCard';

const CardListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${props => props.theme.spacing.md};

  @media screen and (min-width: 60em) {
    margin-right: -${props => props.theme.spacing.lg};
  }
`;

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [RecipePreview];
    };
  };
}

const RecipesPage = ({ data }: RecipeList) => {
  return (
    <Layout>
      <CardListing>
        {data.allContentfulRecipe.nodes.map(node => (
          <RecipeCard node={node} key={node.id} />
        ))}
      </CardListing>
    </Layout>
  );
};

export default RecipesPage;

export const query = graphql`
  query {
    allContentfulRecipe {
      nodes {
        ...RecipeCardFragment
      }
    }
  }
`;
