import React, { Component } from 'react';
import styled from 'styled-components';

import 'antd/dist/antd.css';

import Hero from './sections/Hero/Hero';
import Speak from './sections/Speak/Speak';
import SearchSection from './sections/Search/SearchSection';

export default class App extends Component {
  state = {
    fetchedText: ''
  };

  onTextFetched = fetchedText => this.setState({ fetchedText });

  render() {
    return (
      <Container>
        <Hero />
        <Content>
          <SearchSection fetchedText={this.onTextFetched} />
          <Speak text={this.state.fetchedText} />
        </Content>
      </Container>
    );
  }
}

const Container = styled.main``;

const Content = styled.section`
  .source-boxes {
    padding: 20px;
  }
`;

/* PLANNING:

- App:
  ** select source
      -- buttons
  ** search source
      -- buttons
      -- input
  ** speak text
      -- control panel
      -- textbook

*/
