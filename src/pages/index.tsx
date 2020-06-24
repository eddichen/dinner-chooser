import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

interface RecipeList {
  data: {
    allContentfulRecipe: {
      edges: [
        {
          node: {
            id: string;
            title: string;
            url: string;
          };
        }
      ];
    };
  };
}

const IndexPage = ({ data }: RecipeList) => {
  return (
    <Layout>
      {data.allContentfulRecipe.edges.map(({ node }) => (
        <Link to={`/recipe/${node.url}/`} key={node.id}>
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
