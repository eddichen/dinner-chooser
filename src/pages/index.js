import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {data.allContentfulRecipe.edges.map(({ node }, index) => (
        <Link to={`/recipe/${node.url}/`} key={index}>
          <h2>{node.title}</h2>
        </Link>
      ))}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query RecipeListQuery {
    allContentfulRecipe {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`;
