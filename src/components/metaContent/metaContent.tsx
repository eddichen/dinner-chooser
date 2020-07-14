import React from 'react';
import { Helmet } from 'react-helmet';

import useSiteMetadata from '../../hooks/use-site-metadata';

type MetaData = {
  location: Location;
  title: string;
  description?: string;
  image?: string;
}

const MetaContent = ({ location, title = 'Dinner Chooser', description, image }: MetaData) => {
  const { siteURL } = useSiteMetadata();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      {description !== null ? <meta property='og:description' content={description} /> : ''}
      {image !== null ? <meta property='og:image' content={image} /> : ''};
      <meta name="twitter:card" content='summary' />
      <meta name="twitter:creator" content='@eddichen' />
      <link rel="canonical" href={`${siteURL}${location.pathname}`} />
    </Helmet>
  );
};

export default MetaContent;
