import React, { Component } from 'react';
import styled from 'styled-components';
import { FaWikipediaW } from 'react-icons/fa';

import 'antd/dist/antd.css';

import Hero from './sections/Hero/Hero';
import Speak from './sections/Speak/Speak';

import SearchBar from './components/Bars/SearchBar';
import Button from './components/Buttons/Button';

export default class App extends Component {
  state = {
    source: undefined,
    searchTerm: '',
    fetchedText: ''
  };

  onSearchSubmit = term => {
    this.setState({ searchTerm: term });

    this.fetchText();
  };

  fetchText() {
    console.log(this.state);

    const BASE_URL =
      'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=true&origin=*&titles=';

    const URL = `${BASE_URL}${encodeURI(this.state.searchTerm)}`;

    fetch(URL)
      .then(resp => resp.json())
      .then(jsonData => this.extractText(jsonData.query.pages))
      .then(() => this.cleanText())
      .catch(err => console.log(err));
  }

  extractText = jsonData => {
    let text = '';

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
      } else {
        text = 'Page not found';
      }

      this.setState({
        fetchedText: text
      });
    }
  };

  // clean the text
  cleanText = () => {
    let rawText = this.state.fetchedText;

    // headings at the end of the wiki article
    const FOOTER_HEADINGS = [
      '== See also ==',
      '== Notes ==',
      '== External links ==',
      '== References =='
    ];

    // if the footer heading exists, remove it
    FOOTER_HEADINGS.forEach(x => {
      const headingIndex = rawText.indexOf(x);

      if (headingIndex !== -1) {
        rawText = rawText.substring(rawText, headingIndex);
      }
    });

    // remove any special characters
    let text = rawText.replace(/[^a-z0-9 .,]/gi, '');

    // insert a space after a fullstop
    text = text.replace(/\.(\S)/g, '. $1');

    this.setState({
      fetchedText: text
    });
  };

  render() {
    return (
      <Container>
        <Hero />
        <Content>
          <div className="source-boxes">
            <h3>Choose the source!</h3>
            <Button type="dashed" size="large" reactIcon={<FaWikipediaW />} />
            <Button />
          </div>
          <SearchBar onSubmit={this.onSearchSubmit} />
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
