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
`;
