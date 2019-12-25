import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlay, FaStop, FaPause } from 'react-icons/fa';
import { Input } from 'antd';

import RoundButton from '../../components/Buttons/RoundButton';

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

  componentDidUpdate() {
    console.log(this.props);
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

  // TODO... pause (not stop) the speaking
  pause = () => console.log(10);

  stop = () => window.speechSynthesis.cancel();

  render() {
    return (
      <Container>
        <ButtonRow>
          <ButtonContainer onClick={this.speak}>
            <RoundButton
              primary
              icon="play-circle"
              theme="filled"
              size="large"
            />
          </ButtonContainer>
          <ButtonContainer onClick={this.pause}>
            <RoundButton icon="pause-circle" theme="filled" size="large" />
          </ButtonContainer>
          <ButtonContainer onClick={this.stop}>
            <RoundButton danger icon="stop" theme="filled" size="large" />
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
