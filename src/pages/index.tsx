import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import MetaContent from '../components/metaContent/metaContent';
import RecipeCard from '../components/recipeCard';
import Layout from '../components/layout';
import Button from '../components/button/button';
import CardListing from '../components/cardListing/cardListing';
import { H2 } from '../components/heading/heading';

const ButtonContainer = styled.div`
  text-align: center;
`;

const PhraseHeader = styled.h2`
  font-family: ${props => props.theme.fontFamily.serif};
  font-size: ${props => props.theme.fontSize.xxxl};
  margin: ${props => props.theme.spacing.md} 0 ;
`;

interface PageQuery {
  data: {
    allContentfulRecipe: {
      nodes: Recipe[];
    },
    allContentfulPhrases: {
      nodes: [{
        phrase: [string]
      }]
    }
  }
}

interface Recipe {
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
  /* refactor this hook so that an empty object can be used for the inital value and satisfy typescript */
  const [randomRecipe, setRecipe] = useState<Recipe>({
    id: '',
    title: '',
    url: '',
    image: {
      description: '',
      file: {
        url: ''
      }
    }
  });
  const [previousRecipes, setPreviousRecipe] = useState(['']);
  const [randomPhrase, setPhrase] = useState('');
  const phrases: string[] = data.allContentfulPhrases.nodes[0].phrase;

  const selectRecipe = (recipes: Recipe[]): void => {
    if (endOfRecipes(previousRecipes.length, recipes.length)) return;

    const selectedRecipe: Recipe = recipes[Math.floor(Math.random() * recipes.length)];
    const selectedRecipeId = selectedRecipe.id;

    if (previousRecipes.includes(selectedRecipeId)) {
      return selectRecipe(recipes);
    }

    setPreviousRecipe(previousRecipes.concat(selectedRecipeId));
    return setRecipe(selectedRecipe);
  };

  const selectPhrase = (): void => {
    if (endOfRecipes(previousRecipes.length, data.allContentfulRecipe.nodes.length)) return setPhrase('No more recipes');

    const selectedPhrase: string = phrases[Math.floor(Math.random() * phrases.length)];
    if (selectedPhrase === randomPhrase) {
      return selectPhrase();
    }
    return setPhrase(selectedPhrase);
  }

  const endOfRecipes = (numRecipesdisplayed: number, totalNumRecipes: number): boolean => {
    return numRecipesdisplayed > totalNumRecipes;
  }

  const displayRecipe = () => {
    selectRecipe(data.allContentfulRecipe.nodes);
    selectPhrase();
  }

  // displaying a recipe on page load once
  useEffect(() => displayRecipe(), []);

  return (
    <>
      {typeof window !== 'undefined' ?
        <MetaContent
          location={location}
          title={'Dinner Chooser'}
        />
        : ''}
      <Layout>
        {randomPhrase !== '' ? <ButtonContainer><PhraseHeader>{randomPhrase}&hellip;</PhraseHeader></ButtonContainer> : ''}
        <CardListing center>
          {Object.entries(randomRecipe).length !== 0 ? <RecipeCard node={randomRecipe} /> : null}
        </CardListing>
        <ButtonContainer>
          <Button type="button" onClick={() => displayRecipe()}>
            Choose a Recipe for me
          </Button>
        </ButtonContainer>
        <H2>All Recipes</H2>
        <CardListing>
          {data.allContentfulRecipe.nodes.map(node => (
            <RecipeCard node={node} key={node.id} />
          ))}
        </CardListing>
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
