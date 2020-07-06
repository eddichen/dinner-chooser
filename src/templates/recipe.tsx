import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Clock, Users } from 'react-feather';

import Layout from '../components/layout';
import useSiteMetadata from '../hooks/use-site-metadata';

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
      description: string;
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
  const { siteURL } = useSiteMetadata();

  const shareButton = () => {
    console.log('share');
    navigator.share({
      title: `Dinner Chooser - ${data.contentfulRecipe.title}`,
      url: `${siteURL}${location.pathname}`
    }).then(() => {
      console.log('shared')
    }).catch(console.error);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dinner Chooser - ${data.contentfulRecipe.title}`}</title>
        <meta name='description' content={data.contentfulRecipe.description} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`Dinner Chooser - ${data.contentfulRecipe.title}`} />
        <meta property='og:description' content={data.contentfulRecipe.description !== null ? data.contentfulRecipe.description : ''} />
        <meta property='og:image' content={data.contentfulRecipe.image !== null ? data.contentfulRecipe.image.file.url : ''} />
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
              <RecipeAttribute itemProp="recipeYield">
                <Users />{' '}
                <RecipeAttributeText>
                  {data.contentfulRecipe.serves}
                </RecipeAttributeText>
              </RecipeAttribute>
              <RecipeAttribute itemProp="cookTime">
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
          <div>
            {navigator.share !== undefined ? <button onClick={shareButton}>Share</button> : (
              <>
                <a href='https://twitter.com/share'>Twitter</a>{' '}
                <a href='https://www.facebook.com/sharer/sharer.php'>Facebook</a>
              </>
            )}
          </div>
          {console.log(location.pathname)}
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
