import styled from 'styled-components';

export const RecipeLayout = styled.div`
  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    display: grid;
    grid-template-columns: 2fr ${props => props.theme.spacing.xl} 1fr;
  }
`;

export const RecipeAttributes = styled.div`
  display: flex;
  font-family: ${props => props.theme.fontFamily.sansSerif};
`;

export const RecipeAttribute = styled.p`
  display: flex;
  margin-right: ${props => props.theme.spacing.md};
  margin-bottom: 0;
`;

export const RecipeAttributeText = styled.span`
  display: inline-block;
  margin-left: ${props => props.theme.spacing.sm};
`;

export const RecipeIntro = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
  }
`;

export const RecipeImageContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: ${props => props.theme.breakpoint.md}) {
    grid-column: 3;
    grid-row: 1;
  }
`;

export const RecipeTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.xxxl};
`;

export const RecipeTitleSecondary = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
`;

export const Ingredients = styled.div`
  font-size: ${props => props.theme.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media screen and (min-width: 48em) {
    grid-column: 3;
  }
`;

export const IngredientsList = styled.ul`
  list-style-type: none;
  margin: 0;
`;

export const RecipeSteps = styled.div`
  @media screen and (min-width: 48em) {
    grid-column: 1;
    grid-row: 2;
  }
`;

export const RecipeStepsListItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Preparation = styled.div`
  font-size: ${props => props.theme.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Method = styled.div`
  font-size: ${props => props.theme.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
