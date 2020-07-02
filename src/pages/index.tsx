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

const PhraseHeader = styled.h2`
  font-size: ${props => props.theme.fontSize.xxl};
`;

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [RecipePreview];
    },
    allContentfulPhrases: {
      nodes: [{
        phrase: [string]
      }]
    }
  };
}

const IndexPage = ({ data }: RecipeList) => {
  const [randomRecipe, setRecipe] = useState({});
  const [previousRecipes, setPreviousRecipe] = useState([]);
  const [randomPhrase, setPhrase] = useState('');
  const phrases = data.allContentfulPhrases.nodes[0].phrase;

  const selectRecipe = (recipes: RecipeList) => {
    const recipeCollection = recipes.data.allContentfulRecipe.nodes;
    const selectedRecipe = { node: recipeCollection[Math.floor(Math.random() * recipeCollection.length)] };
    const selectedRecipeId = selectedRecipe.node.id;
    if (previousRecipes.length >= recipeCollection.length) {
      setPhrase('No more recipes');
      return;
    }
    if (previousRecipes.includes(selectedRecipeId)) {
      return selectRecipe({ data });
    }
    setPreviousRecipe(previousRecipes.concat(selectedRecipeId));
    selectPhrase();
    setRecipe(selectedRecipe);
  };

  const selectPhrase = () => {
    let previousPhrase: string = '';
    const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    if (selectedPhrase === previousPhrase) {
      return selectPhrase();
    }
    return setPhrase(selectedPhrase);
  }

  return (
    <Layout>
      <Link to="/recipes/">All recipes</Link>
      {randomPhrase !== '' ? <ButtonContainer><PhraseHeader>{randomPhrase}&hellip;</PhraseHeader></ButtonContainer> : ''}
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
    allContentfulPhrases {
      nodes {
        phrase
      }
    }
  }
`;
