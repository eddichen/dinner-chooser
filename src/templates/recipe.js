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
