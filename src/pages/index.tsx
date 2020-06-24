import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

interface RecipeList {
  data: {
    allContentfulRecipe: {
      nodes: [
        {
          id: string;
          title: string;
          url: string;
        }
      ];
    };
  };
}

const IndexPage = ({ data }: RecipeList) => {
  return (
    <Layout>
      {data.allContentfulRecipe.nodes.map(node => (
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
      nodes {
        id
        title
        url
      }
    }
  }
`;
