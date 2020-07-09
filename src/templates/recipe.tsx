import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Clock, Users } from 'react-feather';

import Layout from '../components/layout';
import useSiteMetadata from '../hooks/use-site-metadata';
import ShareRecipe from '../components/shareRecipe/shareRecipe';
import {
  RecipeLayout,
  RecipeAttributes,
  RecipeAttribute,
  RecipeAttributeText,
  RecipeIntro,
  RecipeImage,
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
  location: Location;
}

const Recipe = ({ data, location }: RecipeInfo) => {
  const { siteURL } = useSiteMetadata();
  const pageTitle = `Dinner Chooser - ${data.contentfulRecipe.title}`;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name='description' content={data.contentfulRecipe.description} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={data.contentfulRecipe.description !== null ? data.contentfulRecipe.description : ''} />
        <meta property='og:image' content={data.contentfulRecipe.image !== null ? data.contentfulRecipe.image.file.url : ''} />
        <meta name="twitter:card" content='summary' />
        <meta name="twitter:creator" content='@eddichen' />
        <link rel="canonical" href={`${siteURL}${location.pathname}`} />
      </Helmet>
      <Layout>
        <RecipeLayout itemScope itemType="https://schema.org/Recipe">
          <RecipeImage>
            {data.contentfulRecipe.image !== null ? (
              <img
                src={data.contentfulRecipe.image.file.url}
                alt={data.contentfulRecipe.image.description}
                itemProp="image"
              />
            ) : (
                ''
              )}
          </RecipeImage>
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
          <ShareRecipe title={pageTitle} location={location} />
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
