import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import RecipeCard, { RecipePreview } from '../components/recipeCard';
import Layout from '../components/layout';

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [RecipePreview];
    };
  };
}

const IndexPage = ({ data }: RecipeList) => {
  const [randomRecipe, setRecipe] = useState({});

  // get the array length
  // select a random number between 0-array.length
  // select the recipe in the array
  // display the recipe on the FE
  const selectRecipe = (recipes: RecipeList) => {
    const recipeCollection = recipes.data.allContentfulRecipe.nodes;
    const selectedRecipe = { node: recipeCollection[Math.floor(Math.random() * recipeCollection.length)] };
    console.log('selectedRecipe', selectedRecipe);
    setRecipe(selectedRecipe);
  };

  return (
    <Layout>
      <h1>Dinner Chooser</h1>
      <Link to="/recipes/">All recipes</Link>
      <p></p>
      <div>
        {Object.entries(randomRecipe).length !== 0 ? <RecipeCard node={randomRecipe.node} /> : null}
      </div>
      <button type="button" onClick={() => selectRecipe({ data })}>
        Pick something for me
      </button>
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
