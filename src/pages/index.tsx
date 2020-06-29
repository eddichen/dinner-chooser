import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Dinner Chooser</h1>
      <Link to="/recipes/">All recipes</Link>
    </Layout>
  );
};

export default IndexPage;
