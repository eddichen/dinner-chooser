import React from 'react';
import { graphql } from 'gatsby';
import { Clock, Users } from 'react-feather';

import Layout from '../components/layout';
import MetaContent from '../components/metaContent/metaContent';
import ShareRecipe from '../components/shareRecipe/shareRecipe';
import RecipeImage from '../components/recipeImage/recipeImage';
import {
  RecipeLayout,
  RecipeAttributes,
  RecipeAttribute,
  RecipeAttributeText,
  RecipeIntro,
  RecipeImageContainer,
  RecipeTitle,
  RecipeTitleSecondary,
  Ingredients,
  IngredientsList,
  RecipeSteps,
  RecipeStepsListItem,
  Preparation,
  Method
} from './recipeStyles';

interface Recipe {
  contentfulRecipe: {
    image: {
      description: string;
      file: {
        url: string;
      };
    };
    title: string;
    description: string;
    cookingTimeMins: number;
    ingredients: string[];
    preparation: string[];
    method: string[];
    serves: number;
  };
}

interface RecipeInfo {
  data: Recipe;
}

const Recipe = ({ data }: RecipeInfo) => {

  return (
    <>
      {typeof window !== 'undefined' ?
        <MetaContent
          location={location}
          title={`Dinner Chooser - ${data.contentfulRecipe.title}`}
          description={data.contentfulRecipe.description}
          image={data.contentfulRecipe.image.file.url}
        />
        : ''}
      <Layout>
        <RecipeLayout itemScope itemType="https://schema.org/Recipe">
          <RecipeImageContainer>
            {data.contentfulRecipe.image !== null ? (
              <RecipeImage
                src={data.contentfulRecipe.image.file.url}
                alt={data.contentfulRecipe.image.description}
                itemProp="image"
              />
            ) : (
                ''
              )}
          </RecipeImageContainer>
          <RecipeIntro>
            <RecipeTitle itemProp="name">{data.contentfulRecipe.title}</RecipeTitle>
            {data.contentfulRecipe.description !== '' ? <p itemProp="description">{data.contentfulRecipe.description}</p> : ''}
            <RecipeAttributes>
              <RecipeAttribute>
                <Users />{' '}
                <RecipeAttributeText itemProp="recipeYield">
                  {data.contentfulRecipe.serves}
                </RecipeAttributeText>
              </RecipeAttribute>
              <RecipeAttribute>
                <Clock />{' '}
                <RecipeAttributeText itemProp="cookTime" content={`PT${data.contentfulRecipe.cookingTimeMins}M`}>
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
                <li key={index} itemProp="recipeIngredient">{ingredient}</li>
              ))}
            </IngredientsList>
          </Ingredients>
          <RecipeSteps>
            {data.contentfulRecipe.preparation ? (
              <Preparation>
                <RecipeTitleSecondary>Preparation</RecipeTitleSecondary>
                <ol>
                  {data.contentfulRecipe.preparation.map((step, index) => (
                    <RecipeStepsListItem key={index} itemProp="recipeInstructions">{step}</RecipeStepsListItem>
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
                  <RecipeStepsListItem key={index} itemProp="recipeInstructions">{step}</RecipeStepsListItem>
                ))}
              </ol>
            </Method>
          </RecipeSteps>
          {typeof window !== 'undefined' ?
            <ShareRecipe title={data.contentfulRecipe.title} location={location} />
            : ''}
        </RecipeLayout>
      </Layout>
    </>
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
      description
      cookingTimeMins
      ingredients
      preparation
      method
      serves
    }
  }
`;
