import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import RecipeCard from '../components/recipeCard';
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

interface PageQuery {
  data: {
    allContentfulRecipe: {
      nodes: RecipePreview[];
    },
    allContentfulPhrases: {
      nodes: [{
        phrase: [string]
      }]
    }
  }
}

interface RecipePreview {
  id: string;
  title: string;
  url: string;
  image: {
    description: string;
    file: {
      url: string;
    }
  }
}

const IndexPage = ({ data }: PageQuery) => {
  const [randomRecipe, setRecipe] = useState({});
  const [previousRecipes, setPreviousRecipe] = useState([]);
  const [randomPhrase, setPhrase] = useState('');
  const phrases: string[] = data.allContentfulPhrases.nodes[0].phrase;

  const selectRecipe = (recipes: RecipePreview[]) => {
    const selectedRecipe: RecipePreview = recipes[Math.floor(Math.random() * recipes.length)];
    const selectedRecipeId = selectedRecipe.id;

    if (previousRecipes.length >= data.allContentfulRecipe.nodes.length) {
      return;
    }

    if (previousRecipes.includes(selectedRecipeId)) {
      return selectRecipe(recipes);
    }

    setPreviousRecipe(previousRecipes.concat(selectedRecipeId));
    return setRecipe(selectedRecipe);
  };

  const selectPhrase = () => {
    if (previousRecipes.length >= data.allContentfulRecipe.nodes.length) {
      return setPhrase('No more recipes');
    }

    const selectedPhrase: string = phrases[Math.floor(Math.random() * phrases.length)];
    if (selectedPhrase === randomPhrase) {
      return selectPhrase();
    }
    return setPhrase(selectedPhrase);
  }

  const displayRecipe = () => {
    selectRecipe(data.allContentfulRecipe.nodes);
    selectPhrase();
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dinner Chooser</title>
      </Helmet>
      <Layout>
        <Link to="/recipes/">All recipes</Link>
        {randomPhrase !== '' ? <ButtonContainer><PhraseHeader>{randomPhrase}&hellip;</PhraseHeader></ButtonContainer> : ''}
        <CardListing>
          {Object.entries(randomRecipe).length !== 0 ? <RecipeCard node={randomRecipe} /> : null}
        </CardListing>
        <ButtonContainer>
          <Button type="button" onClick={() => displayRecipe()}>
            Show me what you got!
          </Button>
        </ButtonContainer>
      </Layout>
    </>
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
