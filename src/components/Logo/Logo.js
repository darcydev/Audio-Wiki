import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { Picture } from 'react-responsive-picture';

export default function Logo() {
  return (
    <Picture
      sources={[
        {
          srcSet: 'images/logo_50.png',
          media: '(max-width: 420px)'
        },
        {
          srcSet: 'images/logo_75.png',
          media: '(max-width: 1024px)'
        },
        {
          srcSet: 'images/logo_100.png'
        }
      ]}
    />
  );
}

const Container = styled.img``;
