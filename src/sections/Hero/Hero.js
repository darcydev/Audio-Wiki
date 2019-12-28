import React from 'react';
import styled from 'styled-components';

import Logo from '../../components/Logo/Logo';

export default function Hero() {
  return (
    <Container>
      <Logo />
      <h1>Audo Wiki</h1>
      <h2>the multitasker's encyclopedia</h2>
    </Container>
  );
}

const Container = styled.header`
  text-align: center;
  padding: 30px;

  h1 {
    font-family: 'Ma Shan Zheng';
    font-size: 60px;
    margin-bottom: 0;
  }

  h2 {
    font-family: 'Cabin';
    font-size: 30px;
  }
`;
