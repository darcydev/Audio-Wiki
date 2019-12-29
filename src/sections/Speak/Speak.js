import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import SimpleButton from '../../components/Buttons/SimpleButton';

const { TextArea } = Input;

export default class Speak extends Component {
  state = {
    supported: true,
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

  speak = () => {
    this._speech.text = this.props.text;
    this._speech.lang = 'en-US';

    window.speechSynthesis.speak(this._speech);

    this.setState({ isSpeaking: true });
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
    const READ_ARTICLE_MARKUP = this.props.url ? (
      <ArticleLinkContainer>
        <SimpleButton
          type="link"
          href={this.props.url}
          text="Read full article"
        />
      </ArticleLinkContainer>
    ) : null;

    return (
      <Container>
        <ButtonRow>
          <ButtonContainer onClick={this.speak}>
            <SimpleButton
              customTextIcon={
                <Icon
                  type="play-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              }
            />
          </ButtonContainer>
          <ButtonContainer onClick={this.pause}>
            <SimpleButton
              customTextIcon={
                <Icon
                  type="pause-circle"
                  theme="twoTone"
                  twoToneColor="#ffae00"
                />
              }
            />
          </ButtonContainer>
          <ButtonContainer onClick={this.stop}>
            <SimpleButton
              customTextIcon={
                <Icon type="stop" theme="twoTone" twoToneColor="#eb2f96" />
              }
            />
          </ButtonContainer>
        </ButtonRow>
        <TextArea value={this.props.text} autoSize={true} />
        {READ_ARTICLE_MARKUP}
      </Container>
    );
  }
}

const Container = styled.section``;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0;
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

const ArticleLinkContainer = styled.div``;
