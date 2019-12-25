import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import SearchBar from './SearchBar';
import SpeakText from './SpeakText';

// TODO: import wikipedia from "../api/wikipedia";

export default class App extends Component {
  state = {
    text: ''
  };

  onSearchSubmit = term => {
    this.setState({
      text: ''
    });

    const BASE_URL =
      'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=true&origin=*&titles=';

    const URL = BASE_URL + encodeURI(term);

    fetch(URL)
      .then(resp => resp.json())
      .then(jsonData => this.getRawText(jsonData.query.pages))
      .then(() => this.cleanText())
      .catch(err => console.log(err));
  };

  getRawText = jsonData => {
    let text = '';

    Object.keys(jsonData).forEach(pageID => {
      const wikiPage = jsonData[pageID];

      text = this.state.text + wikiPage.extract;
    });

    // --------------- ERROR HANDLING ---------------
    // At this stage, it is possible that the API hasn't been able to extract any text.
    // The reason could be:
    // a) User error: searching for a term that doesn't have a Wikipedia page, or
    // b) Program error: there's a bug!
    // Regardless of the reason, to avoid the situation of "undefined" being displayed to the User, we will have some default text.
    // Accordingly, check if the the text returned is not "undefined". If so, simply update the State with that text.
    // However, if the text returned is "undefined", update the State with an error message.
    text =
      text === 'undefined'
        ? "Sorry, we haven't been able to find that Wikipedia page. Please enter a new search term."
        : text;

    // If the WikiAPI has returned multiple Wiki pages, RAW_TEXT will contain the phrase "may refer to:" in the first paragraph
    // If so, display a specific 'error message' to the User on the DOM
    const firstParagraph = text.substring(0, text.indexOf('\n'));

    if (firstParagraph.includes('may refer to:')) {
      text =
        'Sorry, many pages were found with that search term. Try again with something more specific.';
    }
    // --------------- \.ERROR HANDLING ---------------

    this.setState({
      text
    });
  };

  /**
   * Function to turn the raw text into clean text can be properly read by the program.
   */
  cleanText = () => {
    let rawText = this.state.text;

    // At the end of a Wiki article, there may be several 'footer heading' that link to other pages. The exact headings
    // on each is unknown.
    // Accordingly, the below is an array of possible any 'footer heading'
    const FOOTER_HEADINGS = [
      '== See also ==',
      '== Notes ==',
      '== External links ==',
      '== References =='
    ];
    // Iterate over each of the FOOTER_HEADINGS
    // If the FOOTER_HEADING exists in cleanedText (that is, indexOf !== -1)
    // using substring(), remove any text thereafter the indexOf
    FOOTER_HEADINGS.forEach(x => {
      const headingIndex = rawText.indexOf(x);

      if (headingIndex !== -1) {
        rawText = rawText.substring(rawText, headingIndex);
      }
    });

    // The text contains several 'special characters'.
    // Remove any character that isn't a space, comma, fullstop, or alphanumeric:
    let text = rawText.replace(/[^a-z0-9 .,]/gi, '');

    // The text is often missing the space after a fullstop. If so, insert it:
    text = text.replace(/\.(\S)/g, '. $1');

    this.setState({
      text: text
    });
  };

  render() {
    return (
      <div className="main">
        <div className="control-bar">
          <SearchBar onSubmit={this.onSearchSubmit} />
          <SpeakText text={this.state.text} />
        </div>

        <TextareaAutosize
          id="textarea"
          value={this.state.text}
          className="form-control form-control-lg"
          readOnly
        />
      </div>
    );
  }
}
