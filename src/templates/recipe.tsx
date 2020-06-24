import React from 'react';
import { graphql } from 'gatsby';
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

const Recipe = ({ data }: Recipe) => {
  return (
    <Layout>
      <div>
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
        <h2>Method</h2>
        <ol>
          {data.contentfulRecipe.method.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
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
