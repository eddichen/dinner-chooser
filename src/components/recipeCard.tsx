import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import RecipeImage from '../components/recipeImage/recipeImage';

const Card = styled.div`
  flex: 0 1 calc(50% - ${props => props.theme.spacing.md});
  margin: 0 ${props => props.theme.spacing.md}
    ${props => props.theme.spacing.md} 0;

  @media screen and (min-width: ${props => props.theme.breakpoint.lg}) {
    flex: 0 1 calc(33.33% - ${props => props.theme.spacing.lg});
    margin: 0 ${props => props.theme.spacing.lg}
      ${props => props.theme.spacing.lg} 0;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
`;

const CardTitle = styled.h2`
  color: black;
  font-size: ${props => props.theme.fontSize.md};

  @media screen and (min-width: ${props => props.theme.breakpoint.lg}) {
    font-size: ${props => props.theme.fontSize.lg};
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export interface RecipeCard {
  node: {
    id: string;
    title: string;
    url: string;
    image: {
      description: string;
      file: {
        url: string;
      }
    }
  }
}

const RecipeCard = ({ node }: RecipeCard) => {
  return (
    <Card key={node.id}>
      <CardLink to={`/recipe/${node.url}/`}>
        {node.image !== null ? (
          <RecipeImage src={node.image.file.url} alt={node.image.description} />
        ) : (
            ''
          )}
        <CardTitle>{node.title}</CardTitle>
      </CardLink>
    </Card>
  );
}

export const query = graphql`
  fragment RecipeCardFragment on ContentfulRecipe {
    id
    title
    url
    image {
      description
      file {
        url
      }
    }
  }
`;

export default RecipeCard;
