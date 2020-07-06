import React from 'react';
import { Share, Facebook, Twitter } from 'react-feather';

import useSiteMetadata from '../../hooks/use-site-metadata';
import {
  ShareList,
  ShareListItem,
  ShareListLink,
  ShareButton,
  ShareButtonText
} from './shareRecipeStyles';

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
        typeof window !== 'undefined' && navigator.share !== undefined ? <ShareButton onClick={() => shareButton()}><Share /><ShareButtonText>Share</ShareButtonText></ShareButton> : (
          <ShareList>
            <ShareListItem>
              Share to:
            </ShareListItem>
            <ShareListItem>
              <ShareListLink href='https://twitter.com/share'><Twitter /></ShareListLink>
            </ShareListItem>
            <ShareListItem>
              <ShareListLink href='https://www.facebook.com/sharer/sharer.php'><Facebook /></ShareListLink>
            </ShareListItem>
          </ShareList>
        )
      }
    </>
  )
}

export default ShareRecipe;
