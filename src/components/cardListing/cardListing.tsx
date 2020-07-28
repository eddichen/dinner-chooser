import styled from 'styled-components';

const CardListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${props => props.theme.spacing.md};

  @media screen and (min-width: 60em) {
    margin-right: -${props => props.theme.spacing.lg};
  }
`;

export default CardListing;
