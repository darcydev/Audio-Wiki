import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Icon, Select, Slider } from 'antd';
import Speech from 'speak-tts';

import SimpleButton from '../../components/Buttons/SimpleButton';

const { TextArea } = Input;
const { Option } = Select;

const speech = new Speech();

export default class Speak extends Component {
  state = {
    supported: false,
    voicesSupported: [],
    voice: undefined,
    rate: 1,
    pitch: 1
  };

  componentDidMount() {
    if (speech.hasBrowserSupport()) this.setState({ supported: true });

    speech.init().then(data => this.setState({ voicesSupported: data.voices }));
  }

  speak = () => {
    if (!this.state.supported) return;

    speech.setRate(this.state.rate);
    speech.setPitch(this.state.pitch);
    speech.setVolume(1);
    speech.setVoice(this.state.voice);

    if (speech.paused()) speech.resume();
    else {
      speech
        .speak({
          text: this.props.text,
          queue: false
        })
        .then(() =>
          this.setState({ isSpeaking: true }).catch(error =>
            console.error(error)
          )
        );
    }
  };

  pause = () => speech.pause();
  stop = () => speech.cancel();
  onVoiceSelect = value => this.setState({ voice: value });
  onPitchChange = value => this.setState({ pitch: value });
  onRateChange = value => this.setState({ rate: value });

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

    console.log(this.state);

    const VOICE_OPTIONS_MARKUP =
      this.state.voicesSupported.length > 0 ? (
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Select voice"
          onChange={this.onVoiceSelect}
        >
          {this.state.voicesSupported.map(voice => (
            <Option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </Option>
          ))}
        </Select>
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
        <ControlPanel>
          <SelectBarContainer>{VOICE_OPTIONS_MARKUP}</SelectBarContainer>
          <SliderContainer>
            <h4>Pitch</h4>
            <Slider defaultValue={1} max={2} onChange={this.onPitchChange} />
          </SliderContainer>
          <SliderContainer>
            <h4>Rate</h4>
            <Slider defaultValue={1} max={5} onChange={this.onRateChange} />
          </SliderContainer>
        </ControlPanel>
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

const ControlPanel = styled.div`
  padding: 10px 0;
`;

const ArticleLinkContainer = styled.div``;
const SelectBarContainer = styled.div``;
const SliderContainer = styled.div``;
