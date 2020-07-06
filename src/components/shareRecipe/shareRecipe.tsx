import React from 'react';
import { Share, Facebook, Twitter } from 'react-feather';

import useSiteMetadata from '../../hooks/use-site-metadata';

const ShareRecipe = ({ location, title }) => {
  const { siteURL } = useSiteMetadata();

  const shareButton = () => {
    navigator.share({
      title: { title },
      url: `${siteURL}${location.pathname}`
    }).then(() => {
      console.log('shared');
    }).catch(console.error);
  };
  return (
    <>
      {
        typeof window !== 'undefined' && navigator.share !== undefined ? <button onClick={() => shareButton()}><Share /> Share</button> : (
          <ul>
            <li>
              <span>Share to:</span>
            </li>
            <li>
              <a href='https://twitter.com/share'><Twitter /></a>
            </li>
            <li>
              <a href='https://www.facebook.com/sharer/sharer.php'><Facebook /></a>
            </li>
          </ul>
        )
      }
    </>
  )
}

export default ShareRecipe;
