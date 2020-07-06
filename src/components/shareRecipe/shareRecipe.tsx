import React from 'react';
import styled from 'styled-components';
import { Share, Facebook, Twitter } from 'react-feather';

import useSiteMetadata from '../../hooks/use-site-metadata';

const ShareList = styled.ul`
  list-style-type: none;
  font-family: ${props => props.theme.fontFamily.sansSerif};
  margin: 0;
  display: flex;
`;

const ShareListItem = styled.li`
  margin-right: ${props => props.theme.spacing.md};
  font-weight: bold;
`;

const ShareListLink = styled.a`
  color: ${props => props.theme.color.black};
`;

const ShareButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const ShareButtonText = styled.span`
  margin-left: ${props => props.theme.spacing.sm};
`;

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
              <span>Share to:</span>
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
