import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Card } from 'antd';

import SectionHeading from '../../components/Headings/SectionHeading';
import SimpleButton from '../../components/Buttons/SimpleButton';
import WikipediaIcon from '../../components/Icons/WikipediaIcon';
import GuardianIcon from '../../components/Icons/GuardianIcon';

const { Search } = Input;

export default class SearchSection extends Component {
  state = {
    source: '',
    category: '',
    searchTerm: '',
    articles: {}
  };

  onSourceClick = source => this.setState({ source });
  onCategoryClick = category => this.setState({ category });
  onArticleClick = (text, url) => {
    this.props.fetchedText(text);
    this.props.fetchedUrl(url);
  };

  onSearchSubmit = () => {
    if (this.state.source === 'Wikipedia') this.fetchWikipediaText();
    else if (this.state.source === 'Guardian') this.fetchGuardianText();
    else if (this.state.source === 'News.com') this.fetchNewsText();
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

  fetchGuardianText() {
    const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
    const q = this.state.searchTerm;
    const tag =
      this.state.category === ''
        ? ''
        : `&tag=${this.state.category}/${this.state.category}`;

    const URL = `https://content.guardianapis.com/search?q=${q}${tag}&show-blocks=all&api-key=${API_KEY}`;

    fetch(URL)
      .then(resp => resp.json())
      .then(jsonData => this.setState({ articles: jsonData.response.results }))
      .catch(err => console.log(err));
  }

  fetchNewsText() {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    fetch(URL)
      .then(resp => resp.json())
      .then(jsonData => this.setState({ articles: jsonData.articles }))
      .catch(err => console.log(err));
  }

  render() {
    let CATEGORY_MARKUP, ARTICLES_MARKUP;

    const INPUT_MARKUP = (
      <Search
        placeholder={`Search ${this.state.source}`}
        enterButton="Search"
        size="large"
        onChange={e => this.setState({ searchTerm: e.target.value })}
        onSearch={() => this.onSearchSubmit()}
      />
    );

    const NEWS_COM_ARTICLES_MARKUP =
      this.state.source === 'News.com' && this.state.articles.length > 0 ? (
        <ArticlesContainer>
          <Card title="Articles">
            {this.state.articles.map((article, i) => (
              <ButtonContainer
                key={i}
                onClick={() =>
                  this.onArticleClick(article.content, article.url)
                }
              >
                <Card.Grid style={CARD_STYLE}>{article.title}</Card.Grid>
              </ButtonContainer>
            ))}
          </Card>
        </ArticlesContainer>
      ) : null;

    const GUARDIAN_ARTICLES_MARKUP =
      this.state.source === 'Guardian' && this.state.articles.length > 0 ? (
        <ArticlesContainer>
          <Card title="Articles">
            {this.state.articles.map((article, i) => (
              <ButtonContainer
                key={i}
                onClick={() =>
                  this.onArticleClick(article.blocks.body[0].bodyTextSummary)
                }
              >
                <Card.Grid style={CARD_STYLE}>{article.webTitle}</Card.Grid>
              </ButtonContainer>
            ))}
          </Card>
        </ArticlesContainer>
      ) : null;

    const GUARDIAN_MARKUP = (
      <>
        <ButtonRow>
          {/* set to blank as breaking equals everything */}
          <ButtonContainer onClick={() => this.onCategoryClick('')}>
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

    if (this.state.source === 'Guardian') {
      CATEGORY_MARKUP = GUARDIAN_MARKUP;
      ARTICLES_MARKUP = GUARDIAN_ARTICLES_MARKUP;
    } else if (this.state.source === 'News.com') {
      ARTICLES_MARKUP = NEWS_COM_ARTICLES_MARKUP;
    }

    return (
      <Container>
        <SectionHeading heading="search" />
        <ButtonRow>
          <ButtonContainer onClick={() => this.onSourceClick('Wikipedia')}>
            <SimpleButton
              type="dashed"
              customTextIcon={<WikipediaIcon />}
              text="Wikipedia"
            />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onSourceClick('Guardian')}>
            <SimpleButton
              type="dashed"
              customTextIcon={<GuardianIcon />}
              text="Guardian"
            />
          </ButtonContainer>
          <ButtonContainer onClick={() => this.onSourceClick('News.com')}>
            <SimpleButton type="dashed" text="News.com" />
          </ButtonContainer>
        </ButtonRow>
        {CATEGORY_MARKUP}
        {INPUT_MARKUP}
        {ARTICLES_MARKUP}
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
  padding: 30px 0;
`;

const ButtonContainer = styled.div``;

const ArticlesContainer = styled.div``;

const CARD_STYLE = {
  width: '50%',
  height: '25%',
  fontSize: '13px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
