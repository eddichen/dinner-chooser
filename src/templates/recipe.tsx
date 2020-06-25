import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

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
    grid-template-columns: 2fr 1fr;
  }
`;

const RecipeIntro = styled.div`
  @media screen and (min-width: 48em) {
    grid-column: 1/3;
  }
`;

const Ingredients = styled.div`
  @media screen and (min-width: 48em) {
    grid-column: 2;
  }
`;

const Method = styled.div`
  @media screen and (min-width: 48em) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const Recipe = ({ data }: Recipe) => {
  return (
    <Layout>
      <RecipeLayout>
        <RecipeIntro>
          {data.contentfulRecipe.image !== null ? (
            <img
              src={data.contentfulRecipe.image.file.url}
              alt={data.contentfulRecipe.image.description}
            />
          ) : (
            ''
          )}
          <h1>{data.contentfulRecipe.title}</h1>
          <p>Cooking time: {data.contentfulRecipe.cookingTimeMins}</p>
          <p>Serves: {data.contentfulRecipe.serves}</p>
        </RecipeIntro>
        <Ingredients>
          <h2>Ingredients</h2>
          <ul>
            {data.contentfulRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          {data.contentfulRecipe.preparation ? (
            <>
              <h2>Preparation</h2>
              <ol>
                {data.contentfulRecipe.preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </>
          ) : (
            ''
          )}
        </Ingredients>
        <Method>
          <h2>Method</h2>
          <ol>
            {data.contentfulRecipe.method.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Method>
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
