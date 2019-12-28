import React from 'react';
import styled from 'styled-components';

import SimpleButton from '../../components/Buttons/SimpleButton';

export default function SearchButtons({ buttons }) {
  const BUTTON_MARKUP = buttons.forEach(v => <SimpleButton text={v} />);

  return <Container>{BUTTON_MARKUP}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  margin: 0 50px;
`;
