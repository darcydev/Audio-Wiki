import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

import SectionHeading from '../../components/Headings/SectionHeading';
import SimpleButton from '../../components/Buttons/SimpleButton';

const { Search } = Input;

export default class SearchSection extends Component {
  state = {
    source: '',
    category: '',
    searchTerm: '',
    fetchedText: ''
  };

  onSourceClick = source => this.setState({ source });
  onCategoryClick = category => this.setState({ category });

  onSearchSubmit = () => {
    if (this.state.source === 'Wikipedia') this.fetchWikipediaText();
    if (this.state.source === 'Guardian') this.fetchGuardianText();
  };

  fetchWikipediaText() {
    const URL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=true&origin=*&titles=${encodeURI(
      this.state.searchTerm
    )}`;

    fetch(URL)
      .then(resp => resp.json())
      .then(jsonData => this.extractWikipediaText(jsonData.query.pages))
      .catch(err => console.log(err));
  }

  extractWikipediaText = jsonData => {
    // default error handling
    let text = 'Page not found';

    if (jsonData) {
      // fetch the unique page ID
      const pageID = Object.keys(jsonData)[0];

      // if the page was found
      if (pageID !== '-1') {
        // fetch the text
        text = jsonData[pageID].extract;

        // if multiple pages found, display an error message
        const firstPara = text.substring(0, text.indexOf('\n'));

        if (
          firstPara.includes('may refer to') ||
          firstPara.includes('most commonly refers to')
        )
          text = 'Multiple pages found. Please be more specific.';
      }

      this.setState({
        fetchedText: text
      });

      this.props.fetchedText(this.state.fetchedText);
    }
  };

  fetchGuardianText() {}

  render() {
    let CATEGORY_MARKUP;

    const INPUT_MARKUP = (
      <Search
        placeholder={`Search ${this.state.source}`}
        enterButton="Search"
        size="large"
        onChange={e => this.setState({ searchTerm: e.target.value })}
        onSearch={() => this.onSearchSubmit()}
      />
    );

    const GUARDIAN_MARKUP = (
      <>
        <ButtonRow>
          <ButtonContainer onClick={() => this.onCategoryClick('breaking')}>
            <SimpleButton text="Breaking" />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onCategoryClick('politics')}>
            <SimpleButton text="Politics" />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onCategoryClick('sport')}>
            <SimpleButton text="Sport" />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onCategoryClick('technology')}>
            <SimpleButton text="Technology" />
          </ButtonContainer>
        </ButtonRow>
      </>
    );

    if (this.state.source === 'Guardian') CATEGORY_MARKUP = GUARDIAN_MARKUP;

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
        {CATEGORY_MARKUP}
        {INPUT_MARKUP}
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
