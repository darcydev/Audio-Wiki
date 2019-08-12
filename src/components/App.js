import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";

import SearchBar from "./SearchBar";
import SpeakText from "./SpeakText";

import "../scss/App.css";

// import wikipedia from "../api/wikipedia";

export default class App extends Component {
  state = {
    text: "",
    sound: "pause"
  };

  onSearchSubmit = (term) => {
    this.setState({
      text: ""
    });

    const BASE_URL =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=true&origin=*&titles=";

    const URL = BASE_URL + encodeURI(term);

    fetch(URL)
      .then((resp) => resp.json())
      .then((jsonData) => this.getRawText(jsonData.query.pages))
      .then(() => this.cleanText(this.state.text))
      .catch((err) => console.log(err));
  };

  getRawText = (jsonData) => {
    Object.keys(jsonData).forEach((pageID) => {
      const wikiPage = jsonData[pageID];

      var text = this.state.text + wikiPage.extract;

      this.setState({
        text
      });
    });
  };

  cleanText = (rawText) => {
    let cleanedText = rawText.replace(/[^a-z0-9 .,]/gi, "");
    cleanedText = cleanedText.replace(/\.(\S)/g, ". $1");

    cleanedText = cleanedText.split("Notes  References")[0];

    this.setState({
      text: cleanedText
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
