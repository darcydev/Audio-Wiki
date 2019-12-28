import React, { useState } from 'react';
import styled from 'styled-components';

import SectionHeading from '../../components/Headings/SectionHeading';
import Button from '../../components/Buttons/Button';

export default function Select({ parentCallback }) {
  const [source, setSource] = useState('');

  return (
    <Container>
      <SectionHeading heading="select source" />
      <ButtonRow>
        <Button
          size="large"
          text="wikipedia"
          onClick={() => {
            setSource('wikipedia');
            parentCallback('wikipedia');
          }}
        />
        <Button
          size="large"
          text="bloomberg"
          onClick={() => setSource('bloomberg')}
        />
      </ButtonRow>
      <p>The source is: {source}</p>
    </Container>
  );
}

const Container = styled.section`
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;
