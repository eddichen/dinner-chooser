import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Recipe = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>{data.contentfulRecipe.title}</h1>
        <p>Cooking time: {data.contentfulRecipe.cookingTimeMins}</p>
        <p>Serves: {data.contentfulRecipe.serves}</p>
        <h2>Ingredients</h2>
        <ul>
          {data.contentfulRecipe.ingredients.map(ingredient => (
            <li>{ingredient}</li>
          ))}
        </ul>
        <h2>Method</h2>
        <ol>
          {data.contentfulRecipe.method.map(step => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </Layout>
  )
}

export default Recipe

export const query = graphql`
  query RecipeQuery($slug: String!) {
    contentfulRecipe(url: { eq: $slug }) {
      title
      cookingTimeMins
      ingredients
      method
      serves
    }
  }
`
