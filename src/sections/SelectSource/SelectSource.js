import React, { Component } from 'react';
import styled from 'styled-components';

import SectionHeading from '../../components/Headings/SectionHeading';
import SimpleButton from '../../components/Buttons/SimpleButton';

export default class SelectSource extends Component {
  state = {
    source: undefined
  };

  onSourceClick = source => {
    this.setState({ source });

    this.props.onSelect(this.state.source);
  };

  render() {
    return (
      <Container>
        <SectionHeading heading="select source" />
        <ButtonRow>
          <ButtonContainer onClick={() => this.onSourceClick('Wikipedia')}>
            <SimpleButton type="primary" text="Wikipedia" />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onSourceClick('Guardian')}>
            <SimpleButton type="primary" text="Guardian" />
          </ButtonContainer>
        </ButtonRow>
      </Container>
    );
  }
}

const Container = styled.section`
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ButtonContainer = styled.div``;
