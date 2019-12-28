import React from 'react';
import styled from 'styled-components';

export default function SectionHeading({ heading }) {
  return (
    <Container>
      <MainHeading>{heading}</MainHeading>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const MainHeading = styled.h2`
  text-transform: capitalize;
  font-size: 2rem;
  border-bottom: 2px dashed orange;
`;
