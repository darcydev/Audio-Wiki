import React, { Component } from "react";

import "../scss/SpeakText.css";

export default class SpeakText extends Component {
  state = {
    supported: true,
    lang: "en-US",
    autoPlay: false,
    isSpeaking: false,
    isPaused: false
  };

  // TODO: componentWillMount is being depreciated
  UNSAFE_componentWillMount() {
    if ("speechSynthesis" in window) {
      // WebSpeech API
      this._speech = new SpeechSynthesisUtterance();
      this._speech.onend = () => this.setState({ isSpeaking: false });
    } else {
      this.setState({ supported: false });
    }
  }

  componentDidMount() {
    if (this.state.supported && this.state.autoPlay) {
      this.speak();
    }
  }

  speak = () => {
    this._speech.text = this.props.text;
    this._speech.lang = this.state.lang;
    this.setState({ isSpeaking: true });
    window.speechSynthesis.speak(this._speech);
  };

  stop = () => {
    window.speechSynthesis.cancel();
  };

  render() {
    return (
      <div className="btn-row">
        <button
          className="btn btn-lg btn-primary"
          onClick={this.speak}
          disabled={this.state.isSpeaking}
        >
          <i className="fa fa-play" />
        </button>
        <button
          className="btn btn-lg btn-danger"
          onClick={this.stop}
          disabled={!this.state.isSpeaking}
        >
          <i className="fa fa-pause" />
        </button>
      </div>
    );
  }
}
