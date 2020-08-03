import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import CardListing from '../components/cardListing/cardListing';
import RecipeCard from '../components/recipeCard';

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [RecipeCard];
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
