import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

import SimpleButton from '../../components/Buttons/SimpleButton';
import SectionHeading from '../../components/Headings/SectionHeading';

const { TextArea } = Input;

export default class Speak extends Component {
  state = {
    supported: true,
    autoPlay: false,
    isSpeaking: false,
    isPaused: false
  };

  // TODO: componentWillMount is being depreciated
  UNSAFE_componentWillMount() {
    if ('speechSynthesis' in window) {
      // WebSpeech API
      this._speech = new SpeechSynthesisUtterance();
      this._speech.onend = () => this.setState({ isSpeaking: false });
    } else {
      this.setState({ supported: false });
    }
  }

  componentDidMount() {
    if (this.state.supported && this.state.autoPlay) this.speak();
  }

  speak = () => {
    this._speech.text = this.props.text;
    this._speech.lang = 'en-US';

    this.setState({ isSpeaking: true });

    window.speechSynthesis.speak(this._speech);
  };

  pause = () => {
    this.setState({ isSpeaking: false, isPaused: true });

    window.speechSynthesis.pause();
  };

  stop = () => {
    this.setState({ isSpeaking: false });

    window.speechSynthesis.cancel();
  };

  render() {
    return (
      <Container>
        <SectionHeading heading="Speak Section" />
        <ButtonRow>
          <ButtonContainer onClick={this.speak}>
            <SimpleButton icon="play-circle" />
          </ButtonContainer>
          <ButtonContainer onClick={this.pause}>
            <SimpleButton icon="pause-circle" />
          </ButtonContainer>
          <ButtonContainer onClick={this.stop}>
            <SimpleButton icon="stop" />
          </ButtonContainer>
        </ButtonRow>
        <TextArea value={this.props.text} autoSize={true} />
      </Container>
    );
  }
}

const Container = styled.div``;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0;
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;
