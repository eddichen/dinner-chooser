import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import RecipeCard, { RecipePreview } from '../components/recipeCard';
import Layout from '../components/layout';

const CardListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -${props => props.theme.spacing.md};

  @media screen and (min-width: 60em) {
    margin-right: -${props => props.theme.spacing.lg};
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background-color: ${props => props.theme.color.black};
  color: ${props => props.theme.color.white};
  border: none;
  font-family: ${props => props.theme.fontFamily.sansSerif};
  font-size: ${props => props.theme.fontSize.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`;

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [RecipePreview];
    };
  };
}

const IndexPage = ({ data }: RecipeList) => {
  const [randomRecipe, setRecipe] = useState({});
  const [previousRecipes, setPreviousRecipe] = useState([]);

  const selectRecipe = (recipes: RecipeList) => {
    const recipeCollection = recipes.data.allContentfulRecipe.nodes;
    const selectedRecipe = { node: recipeCollection[Math.floor(Math.random() * recipeCollection.length)] };
    const selectedRecipeId = selectedRecipe.node.id;
    if (previousRecipes.length >= recipeCollection.length) {
      console.log('out of recipes');
      return;
    }
    if (previousRecipes.includes(selectedRecipeId)) {
      return selectRecipe({ data });
    }
    setPreviousRecipe(previousRecipes.concat(selectedRecipeId));
    setRecipe(selectedRecipe);
  };

  return (
    <Layout>
      <Link to="/recipes/">All recipes</Link>
      <p></p>
      <CardListing>
        {Object.entries(randomRecipe).length !== 0 ? <RecipeCard node={randomRecipe.node} /> : null}
      </CardListing>
      <ButtonContainer>
        <Button type="button" onClick={() => selectRecipe({ data })}>
          Show me what you got!
        </Button>
      </ButtonContainer>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulRecipe {
      nodes {
        ...RecipeCardFragment
      }
    }
  }
`;
