import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Clock, Users } from 'react-feather';

import Layout from '../components/layout';

interface Recipe {
  data: {
    contentfulRecipe: {
      image: {
        description: string;
        file: {
          url: string;
        };
      };
      title: string;
      cookingTimeMins: number;
      ingredients: [string];
      preparation: [string];
      method: [string];
      serves: number;
    };
  };
}

const RecipeLayout = styled.div`
  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    display: grid;
    grid-template-columns: 2fr ${props => props.theme.spacing.xl} 1fr;
  }
`;

const RecipeAttributes = styled.div`
  display: flex;
  font-family: ${props => props.theme.fontFamily.sansSerif};
`;

const RecipeAttribute = styled.p`
  display: flex;
  margin-right: ${props => props.theme.spacing.md};
  margin-bottom: 0;
`;

const RecipeAttributeText = styled.span`
  display: inline-block;
  margin-left: ${props => props.theme.spacing.sm};
`;

const RecipeIntro = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
  }
`;

const RecipeImage = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    grid-column: 3;
    grid-row: 1;
  }
`;

const RecipeTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.xxl};
`;

const RecipeTitleSecondary = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Ingredients = styled.div`
  font-size: ${props => props.theme.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: 48em) {
    grid-column: 3;
  }
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  margin: 0;
`;

const RecipeSteps = styled.div`
  @media screen and (min-width: 48em) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const RecipeStepsListItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Preparation = styled.div`
  font-size: ${props => props.theme.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Method = styled.div`
  font-size: ${props => props.theme.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Recipe = ({ data }: Recipe) => {
  return (
    <Layout>
      <RecipeLayout>
        <RecipeImage>
          {data.contentfulRecipe.image !== null ? (
            <img
              src={data.contentfulRecipe.image.file.url}
              alt={data.contentfulRecipe.image.description}
            />
          ) : (
            ''
          )}
        </RecipeImage>
        <RecipeIntro>
          <RecipeTitle>{data.contentfulRecipe.title}</RecipeTitle>
          <RecipeAttributes>
            <RecipeAttribute>
              <Users />{' '}
              <RecipeAttributeText>
                {data.contentfulRecipe.serves}
              </RecipeAttributeText>
            </RecipeAttribute>
            <RecipeAttribute>
              <Clock />{' '}
              <RecipeAttributeText>
                {data.contentfulRecipe.cookingTimeMins}
                mins
              </RecipeAttributeText>
            </RecipeAttribute>
          </RecipeAttributes>
        </RecipeIntro>
        <Ingredients>
          <RecipeTitleSecondary>Ingredients</RecipeTitleSecondary>
          <IngredientsList>
            {data.contentfulRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </IngredientsList>
        </Ingredients>
        <RecipeSteps>
          {data.contentfulRecipe.preparation ? (
            <Preparation>
              <RecipeTitleSecondary>Preparation</RecipeTitleSecondary>
              <ol>
                {data.contentfulRecipe.preparation.map((step, index) => (
                  <RecipeStepsListItem key={index}>{step}</RecipeStepsListItem>
                ))}
              </ol>
            </Preparation>
          ) : (
            ''
          )}
          <Method>
            <RecipeTitleSecondary>Method</RecipeTitleSecondary>
            <ol>
              {data.contentfulRecipe.method.map((step, index) => (
                <RecipeStepsListItem key={index}>{step}</RecipeStepsListItem>
              ))}
            </ol>
          </Method>
        </RecipeSteps>
      </RecipeLayout>
    </Layout>
  );
};

export default Recipe;

export const query = graphql`
  query RecipeQuery($slug: String!) {
    contentfulRecipe(url: { eq: $slug }) {
      image {
        description
        file {
          url
        }
      }
      title
      cookingTimeMins
      ingredients
      preparation
      method
      serves
    }
  }
`;
