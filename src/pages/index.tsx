import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

const selectRecipe = () => {
  console.log('selectRecipe');
};

const IndexPage = () => {
  return (
    <Layout>
      <h1>Dinner Chooser</h1>
      <Link to="/recipes/">All recipes</Link>
      <p></p>
      <button type="button" onClick={selectRecipe}>
        Pick something for me
      </button>
    </Layout>
  );
};

export default IndexPage;
